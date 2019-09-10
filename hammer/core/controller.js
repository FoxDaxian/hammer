const glob = require('glob');
const path = require('path');
const config = require('../config');
const utils = require('../utils');
const chalk = require('chalk');
// https://github.com/pillarjs/path-to-regexp#readme
const pathToRegexp = require('path-to-regexp');

module.exports = hammer => {
    // 以去除controller根路径的文件路径为key，存储controller信息
    glob.sync(`${config.path.controller}/**/*.js`).forEach(controllerFile => {
        const mod = utils.require(controllerFile);
        for (let k in mod) {
            if (hammer.config.controllers[k]) {
                console.log(
                    chalk.red(
                        `already has: ${k}, please check other controller files`
                    )
                );
            } else {
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
        }
    });
    return async (ctx, next) => {
        // // 处理跨域，如果加上前端模板后，应该不会出现该问题
        // ctx.res.setHeader('Access-Control-Allow-Origin', '*');
        // ctx.res.setHeader(
        //     'Access-Control-Allow-Methods',
        //     'OPTIONS, GET, PUT, POST, DELETE'
        // );
        // ctx.res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
        // );

        // if (ctx.method == 'OPTIONS') {
        //     ctx.body = '';
        //     ctx.status = 200;
        //     return await next();
        // }
        // ctx.cookies = ''
 
        if (ctx.currentReqStatus === 'static') {
            return await next();
        }

        const controllers = Object.values(hammer.config.controllers);

        let url = ctx.req.url;

        if (path.extname(url)) {
            return next();
        }
        let query = url.match(/\?.+/g) || [''];
        url = url.replace(query, '');
        query = query[0]
            ? query[0]
                  .slice(1)
                  .split('&')
                  .reduce(
                      (obj, cur) =>
                          Object.assign({}, obj, {
                              [cur.split('=')[0]]: cur.split('=')[1]
                          }),
                      {}
                  )
            : {};

        let execRes, matched;
        for (let i = 0, len = controllers.length; i < len; i++) {
            if (
                ctx.method.toLowerCase() ===
                    controllers[i].controller.method.trim().toLowerCase() &&
                (execRes = controllers[i].reg.exec(url))
            ) {
                matched = controllers[i];
                break;
            }
        }

        if (!execRes) {
            if (process.env.NODE_ENV !== 'production') {
                console.log(chalk.red(`${url} not match controll action`));
            }
            return;
        }
        let controllPath = execRes[0];
        const ferouter = execRes[1] || '';
        if (execRes && matched.controller.action) {
            const params = {};
            const mathedKeys = matched.keys;
            let length = mathedKeys.length;
            while (length--) {
                const param = mathedKeys[length].name;
                const value = execRes[length + 1];
                controllPath = controllPath.replace(value, '');
                params[param] = value;
            }
            controllPath = controllPath.replace(/^\/|\/$/g, '');
            ctx.controllPath = controllPath;

            // ctx.services

            // 执行对应路由的action, 把结果赋给body
            // TODO: 注入service？
            const likeMiddleWare = await matched.controller.action.call(null, {
                params,
                query
            }, ctx.services);
            ctx.ferouter = ferouter;
            if (typeof likeMiddleWare === 'function') {
                ctx.scope = await likeMiddleWare(ctx);
            } else {
                ctx.scope = likeMiddleWare;
            }
        }

        // 返回几种类型， react/vue/jsx、string、object、stream、function、response

        await next();
    };
};
