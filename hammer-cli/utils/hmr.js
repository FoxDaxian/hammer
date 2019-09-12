const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const findCore = require('./findCore');
const config = findCore('config');
const utils = findCore('utils');
const pathToRegexp = findCore('node_modules/path-to-regexp');
const configPath = config.path;

const canIgnore = path => {
    return !/\.(js|jsx)$/.test(path);
};

const logError = (eventType, error) => {
    console.log(error.message);
    console.log(
        chalk.red(
            `an error occurred when trigger '${eventType}' event. from controller`
        )
    );
};

let fsTimer = null;
const controller = hammer => {
    const watchPath = configPath.controller;
    // return fsWatcher, and can listen 'change' event
    // bahaves like fs.watchFile
    fs.watch(
        watchPath,
        {
            recursive: true
        },
        (eventType, filename) => {
            // forbid invoke twice
            if (fsTimer === null) {
                if (eventType.toLocaleLowerCase() !== 'rename') {
                    fsTimer = setTimeout(() => {
                        clearTimeout(fsTimer);
                        fsTimer = null;
                    }, 1000);
                }
                try {
                    if (canIgnore(filename)) return;
                    const filePath = path.resolve(watchPath, filename);
                    if (eventType === 'rename' && !fs.existsSync(filePath)) {
                        return;
                    }

                    // https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_require_cache
                    const oldMod = utils.require(filePath);
                    let mod = utils.require(filePath, {
                        cache: false
                    });

                    for (let k in oldMod) {
                        oldMod[k] = null;
                    }
                    mod = {...oldMod, ...mod};

                    for (let k in mod) {
                        let keys = [];
                        const reg = pathToRegexp(`${k}/:ferouter*`, keys, {
                            strict: true
                        });
                        hammer.config.controllers[k] = {
                            reg,
                            keys,
                            controller: {method: 'get', ...mod[k]}
                        };
                    }

                    console.log(chalk.blue('\ncontroller reload\n'));
                } catch (e) {
                    logError(eventType, e);
                }
            }
        }
    );
};

const client = hammer => {
    const watchPath = configPath.client;
    // return fsWatcher, and can listen 'change' event
    // bahaves like fs.watchFile
    fs.watch(
        watchPath,
        {
            recursive: true
        },
        (eventType, filename) => {
            // forbid invoke twice
            if (fsTimer === null) {
                if (eventType.toLocaleLowerCase() !== 'rename') {
                    fsTimer = setTimeout(() => {
                        clearTimeout(fsTimer);
                        fsTimer = null;
                    }, 1000);
                }
                try {
                    // if (canIgnore(filename)) return;
                    const filePath = path.resolve(watchPath, filename);
                    if (eventType === 'rename' && !fs.existsSync(filePath)) {
                        return;
                    }

                    for (const k in require.cache) {
                        // 如果当前缓存中有监听的目录地址，那么删除缓存，不会影响其他
                        if (~k.indexOf(watchPath)) {
                            delete require.cache[k];
                        }
                    }

                    console.log(chalk.blue('\nclient reload\n'));
                } catch (e) {
                    logError(eventType, e);
                }
            }
        }
    );
};
function _middleware(hammer) {
    const middlewares = utils.getMiddlewares(hammer);

    hammer.middlewares = middlewares.map(m => {
        let arg = m.match(/^[^\?]+\?(\{[^}]*\})/),
            middlewareName = m;
        if (arg) {
            middlewareName = m.replace('?' + arg[1], '');
            arg = JSON.parse(arg[1]);
        } else {
            arg = {};
        }

        const fn = utils.require(middlewareName, {
            context: utils.getMwsContext(),
            cache: false
        });
        if (utils.isTypeEqual(fn, 'function')) {
            return fn(arg);
        }
    });
}

const middleware = hammer => {
    const watchPath = configPath.middleware;
    fs.watch(
        watchPath,
        {
            recursive: true
        },
        (eventType, filename) => {
            // forbid invoke twice
            if (fsTimer === null) {
                if (eventType.toLocaleLowerCase() !== 'rename') {
                    fsTimer = setTimeout(() => {
                        clearTimeout(fsTimer);
                        fsTimer = null;
                    }, 1000);
                }
                if (canIgnore(filename)) return;
                const filePath = path.resolve(watchPath, filename);
                if (
                    hammer.config.middlewares.indexOf(
                        utils.getPartialPath('middleware', filePath)
                    ) !== -1
                ) {
                    if (utils.resolvePath(filePath)) {
                        _middleware(hammer);

                        console.log(chalk.blue('\nmiddleware reload\n'));
                    } else {
                        if (eventType === 'rename') {
                            return;
                        }
                        logError(
                            eventType,
                            new Error(`can't find ${filePath}`)
                        );
                    }
                }
            }
        }
    );
};

const _config = hammer => {
    const watchPath = configPath.config;

    fs.watch(
        watchPath,
        {
            recursive: true
        },
        (eventType, filename) => {
            // forbid invoke twice
            if (fsTimer === null) {
                if (eventType.toLocaleLowerCase() !== 'rename') {
                    fsTimer = setTimeout(() => {
                        clearTimeout(fsTimer);
                        fsTimer = null;
                    }, 1000);
                }
                try {
                    if (canIgnore(filename)) return;
                    if (!/development\.js$|default\.js$/.test(filename)) {
                        return;
                    }
                    const filePath = path.resolve(watchPath, filename);
                    if (eventType === 'rename' && !fs.existsSync(filePath)) {
                        return;
                    }

                    // https://nodejs.org/dist/latest-v10.x/docs/api/modules.html#modules_require_cache
                    if (filePath in require.cache) {
                        delete require.cache[filePath];
                    }

                    // 增加非指定属性无用，删除已存在属性无效，必须修改，而不是增加或者删除!
                    hammer.config = {
                        ...hammer.config,
                        ...require(path.resolve(watchPath, 'default.js')),
                        ...require(filePath)
                    };

                    // 修改config的时候 要重启其他，middleware controls
                    _middleware(hammer);

                    console.log(chalk.blue('\nconfig reload\n'));
                } catch (e) {
                    logError(eventType, e);
                }
            }
        }
    );
};

const service = hammer => {
    const servicePath = configPath.service;
    fs.watch(
        servicePath,
        {
            recursive: true
        },
        (eventType, filename) => {
            if (fsTimer === null) {
                if (eventType.toLocaleLowerCase() !== 'rename') {
                    fsTimer = setTimeout(() => {
                        clearTimeout(fsTimer);
                        fsTimer = null;
                    }, 1000);
                }
                try {
                    if (canIgnore(filename)) return;

                    const mod = utils.require(
                        path.join(servicePath, filename),
                        {
                            cache: false
                        }
                    );
                    const key = path.basename(filename).replace('.js', '');
                    if (key !== 'renderer') {
                        hammer.services[key] = mod;
                        console.log(chalk.blue('\nservice reload\n'));
                    }
                } catch (e) {
                    logError(eventType, e);
                }
            }
        }
    );
};

module.exports = hammer => {
    controller(hammer);
    middleware(hammer);
    _config(hammer);
    client(hammer);
    service(hammer);
};
