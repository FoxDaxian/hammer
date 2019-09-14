import Vue from 'vue';
import Router from 'vue-router';
// 如何定义到打包结果的具体入口目录中？ 例如 dist/demo/chunks/single|0.js
const single = () => import(`./single`);

Vue.use(Router);

// TODO: 不推荐使用模板，体积会大，只需要引入vue运行时的输出库，而不是包含编译时的全部库
const Foo = {template: '<div>foo<router-view></router-view></div>'};

export function createRouter() {
    const router = new Router({
        mode: 'history',
        base: '/demopage',
        routes: [
            {
                path: '/home/test',
                component: Foo,
                children: [
                    {
                        path: 'profile',
                        component: single
                    }
                ]
            }
        ]
    });
    return router;
}
