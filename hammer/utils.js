const config = require('./config');
const chalk = require('chalk');
const cwd = process.cwd();
const fs = require('fs');
const path = require('path');

const extnames = ['.js'];

// get key
function getPartialPath(basePath, filePath) {
    return filePath.replace(config.path[basePath], '').replace(/\.\w+$/, '');
}

function exist(filePath) {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (e) {
        return false;
    }
}

function fileType(path) {
    return new Promise(res => fs.stat(path, (err, stats) => res(err || stats)));
}

// require 判断 并获取路径
function resolvePath(path) {
    try {
        const filePath = require.resolve(path);
        return filePath;
    } catch (e) {
        return false;
    }
}

function isTypeEqual(target, judge) {
    return (
        Object.prototype.toString.call(target).toLowerCase() ===
        `[object ${judge.toLowerCase()}]`
    );
}

function getMiddlewares(hammer) {
    // ['koa-body', {}, 'middlewaretest', 'climiddleware']
    let lastmws = null;
    const middlewaresConf =
        hammer.config.middleware || hammer.config.middlewares || [];
    let middlewares = [];

    for (let i = 0, len = middlewaresConf.length; i < len; i++) {
        if (isTypeEqual(middlewaresConf[i], 'string')) {
            lastmws && middlewares.push(lastmws);
            lastmws = middlewaresConf[i];
        } else if (isTypeEqual(middlewaresConf[i], 'object')) {
            if (lastmws) {
                middlewares.push(
                    `${lastmws}?${JSON.stringify(middlewaresConf[i])}`
                );
                lastmws = null;
            }
        } else {
            console.error('middles 只接受 string 或者 object类型');
        }
    }
    lastmws && middlewares.push(lastmws);

    middlewares = middlewares.filter(m => isTypeEqual(m, 'string'));
    return middlewares;
}

// 支持es6模式的export default
function _require(filepath, {cache = true, context = null} = {}) {
    let modPath;
    if (context) {
        context.some(
            contextPath =>
                (modPath = resolvePath(path.join(contextPath, filepath)))
        );
    } else {
        modPath = resolvePath(filepath);
    }
    if (!modPath) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(chalk.red(`module ${filepath} is not found`));
        }
        return;
    }
    if (process.env.NODE_ENV === 'development' && !cache) {
        delete require.cache[modPath];
    }
    let mod = require(modPath);

    if (mod.__esModule && 'default' in mod) {
        mod = mod.default;
    }
    return mod;
}

function getMwsContext() {
    // 查找顺序为  本地编写 => hammer默认提供 => 本地npm包
    return [
        config.path.middleware,
        path.join(process.cwd(), 'node_modules/hammer/middleware'),
        path.join(process.cwd(), 'node_modules')
    ];
}

function merge(target) {
    target = {...target};
    if (!isTypeEqual(target, 'object') && process.env.NODE_ENV !== 'production') {
        return console.log(chalk.red("can't merge non Object"));
    }
    for (let i = 1, len = arguments.length; i < len; i++) {
        for (let k in arguments[i]) {
            const value = arguments[i][k];
            if (target[k]) {
                if (isTypeEqual(value, 'object')) {
                    target[k] = merge(target[k], value);
                } else if (isTypeEqual(value, 'array')) {
                    target[k] = [...target[k], ...value];
                } else {
                    target[k] = value;
                }
            } else {
                target[k] = value;
            }
        }
    }
    return target;
}

module.exports = {
    getPartialPath,
    isTypeEqual,
    resolvePath,
    exist,
    fileType,
    getMiddlewares,
    require: _require,
    getMwsContext,
    merge
};
