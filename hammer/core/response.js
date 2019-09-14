const utils = require('../utils');
const path = require('path');
const Stream = require('stream');
const response = require('../response');
const chalk = require('chalk');

const isTypeEqual = utils.isTypeEqual;
const _require = utils.require;
const cwd = process.cwd();

const Vue = _require(path.join(cwd, 'node_modules', 'vue'));

const onReadyPromise = router => {
    return new Promise(r => {
        router.onReady(() => {
            r();
        });
    });
};

// 依赖 controller， controller 中间件 在 response的前面，所以controller 挂载scope后 由 response处理， 处理的内容是 scaffold 中 server 编写的 用户 路径，包括 vue  json  stream等类型
module.exports = hammer => {
    return async (ctx, next) => {
        if (ctx.currentReqStatus === 'static') {
            return await next();
        }
        const url = ctx.req.url;
        let bodyType;
        let {scope} = ctx;
        if (scope instanceof Error) {
            console.warn(scope, 'scope为error的时候');
            scope = scope.stack;
        }

        switch (true) {
            case scope instanceof Stream:
                bodyType = 'stream';
                break;
            case isTypeEqual(scope, 'string'):
                bodyType = 'string';
                break;
            case scope instanceof Vue:
                bodyType = 'vue';
                break;
            case scope instanceof response:
                bodyType = 'response';
                break;
            case isTypeEqual(scope, 'object'):
                bodyType = 'json';
                break;
            case scope === false:
                bodyType = 'error';
                break;
            case scope === undefined:
                bodyType = null;
                break;
            default:
        }
        switch (bodyType) {
            case 'json':
                ctx.type = 'application/json';
                ctx.body = JSON.stringify(scope);
                break;
            case 'vue':
                const router = scope.ferouter;
                const store = scope.festore;

                router && router.push(ctx.ferouter);

                if (scope.$options.nodeBeforeCreate !== void 0) {
                    if (
                        isTypeEqual(scope.$options.nodeBeforeCreate, 'function')
                    ) {
                        scope.$options.nodeBeforeCreate({store, router});
                    } else if (
                        isTypeEqual(
                            scope.$options.nodeBeforeCreate,
                            'AsyncFunction'
                        )
                    ) {
                        if (process.env.NODE_ENV !== 'production') {
                            console.log(
                                `do not accept asynchronous functions: ${chalk.yellow(
                                    scope.$options.nodeBeforeCreate.toString()
                                )}`
                            );
                        }
                    } else {
                        if (process.env.NODE_ENV !== 'production') {
                            console.log(
                                `nodeBeforeCreate is not function: ${chalk.yellow(
                                    JSON.stringify(
                                        scope.$options.nodeBeforeCreate,
                                        null,
                                        2
                                    )
                                )}`
                            );
                        }
                    }
                }

                if (router) {
                    try {
                        await onReadyPromise(router);
                    } catch (e) {
                        if (process.env.NODE_ENV !== 'production') {
                            console.log(chalk.red('路由匹配失败'));
                        }
                    }

                    const matchedComponents =
                        router.getMatchedComponents() || [];
                    if (matchedComponents.length) {
                        for (
                            let i = 0, len = matchedComponents.length;
                            i < len;
                            i++
                        ) {
                            if (
                                matchedComponents[i].nodeBeforeCreate === void 0
                            ) {
                                continue;
                            }
                            if (
                                isTypeEqual(
                                    matchedComponents[i].nodeBeforeCreate,
                                    'function'
                                )
                            ) {
                                matchedComponents[i].nodeBeforeCreate({
                                    store,
                                    router
                                });
                            } else if (
                                isTypeEqual(
                                    matchedComponents[i].nodeBeforeCreate,
                                    'AsyncFunction'
                                )
                            ) {
                                if (process.env.NODE_ENV !== 'production') {
                                    console.log(
                                        `do not accept asynchronous functions: ${chalk.yellow(
                                            matchedComponents[
                                                i
                                            ].nodeBeforeCreate.toString()
                                        )}`
                                    );
                                }
                            } else {
                                if (process.env.NODE_ENV !== 'production') {
                                    console.log(
                                        `nodeBeforeCreate is not function: ${chalk.yellow(
                                            JSON.stringify(
                                                matchedComponents[i]
                                                    .nodeBeforeCreate,
                                                null,
                                                2
                                            )
                                        )}`
                                    );
                                }
                            }
                        }
                    }
                }

                const {state = {}, ...pageMeta} = scope.$$options;
                store &&
                    store.registerModule('node_inject', {
                        namespaced: true,
                        state: () => state
                    });

                const renderer = _require(
                    path.join(cwd, 'node_modules', 'vue-server-renderer')
                ).createRenderer();
                const renderView = require('../renderView');
                ctx.type = 'text/html';
                try {
                    const html = await renderer.renderToString(scope);
                    ctx.body = await renderView({
                        pageMeta,
                        html,
                        view: scope.$$clientName,
                        state: store ? JSON.stringify(store.state) : null
                    });
                } catch (e) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(chalk.red('please check app entry files:\n', e, '\n'));
                    }
                }
                break;
            case 'response':
                ctx.respond = false;
                scope.response(ctx.res);
                ctx.notNeedBody = true;
                break;
            case 'stream':
                ctx.respond = false;
                scope.pipe(ctx.res);
                ctx.notNeedBody = true;
                break;
            case null:
                // TODO: 这块是否需要完善?
                // 目前只有重定向会用到这部分
                break;
            case 'string':
            case 'error':
                ctx.body = scope;
                break;
            default:
                if (!ctx.body) {
                    ctx.status = 204;
                    ctx.body = 'not response content';
                }
        }
        await next();
    };
};
