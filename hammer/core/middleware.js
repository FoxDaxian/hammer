const path = require('path');
const utils = require('../utils');

module.exports = hammer => {
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
        return utils.require(middlewareName, {
            context: utils.getMwsContext()
        })(arg);
    });

    // compose嵌套compose
    return async (ctx, next) => {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index)
                return Promise.reject(
                    new Error('next() called multiple times')
                );
            index = i;
            // 从第一个开始，有顺序依赖，注意！！
            let fn = hammer.middlewares[i];
            // 执行完当前环境下的所有middleware后，执行最外面的next（也就是执行外层的下一个中间件）
            if (i === hammer.middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                // dispatch.bind(null, i + 1) 相当于 next
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
};
