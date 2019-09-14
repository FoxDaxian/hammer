const path = require('path');

module.exports = {
    port: 3000,
    // 中间件名 [中间件配置参数]
    // 全部在这里配置，hammer默认提供几个中间件，其他的可以自己编写吗，也可以引用三方的
    // 查找顺序为  本地编写 => hammer默认提供 => 本地三方依赖
    // 有顺序的执行中间件
    // middlewares: ['koa-body', {}, 'middlewaretest', 'climiddleware']
    middlewares: ['koa-body', {}],
    // middlewares: [],
    alias: {
        '@client': path.resolve(__dirname, '../client/'),
        '@page': path.resolve(__dirname, '../client/page/'),
        '@components': path.resolve(__dirname, '../client/components/'),
        '@style': path.resolve(__dirname, '../client/style/'),
        '@config': path.resolve(__dirname, '../config/'),
        '@server': path.resolve(__dirname, '../server/')
    },
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
    }
};
