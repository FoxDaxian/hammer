// https://zhuanlan.zhihu.com/p/47044039 同构原理梳理
import response, {redirect, render, json} from 'hammer/response';

export default {
    '/test': {
        method: 'post',
        action(ctx, options) {
            return new response({
                header: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                status: 200,
                body: '12'
            });
        }
    },
    '/test/:name/:three': {
        action(options) {
            return new response({
                header: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                status: 200,
                body: JSON.stringify(options.params)
            });
        }
    },
    '/fox': {
        method: 'post',
        async action(options, {body}) {
            body = await body();
            return await json({
                name: 'fox接口'
            });
        }
    },
    '/fff1': {
        async action() {
            return await render('test', {});
        }
    },
    '/demopage': {
        async action(urlopt, {servicestest, cookies}) {
            // return await redirect('/fff1');
            // const cook = await cookies();
            // console.log(cook.get());

            // return redirect('/res');

            return await render('demo', {
                $title: '页面标112题', // 页面元信息
                state: {
                    lists: [{
                        name: '服务端注入的列表长度'
                    }]
                } // 注入vuex的state
            });
        }
    },
    '/res': {
        action() {
            return new response({
                header: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                status: 200,
                body: '测试response'
            });
        }
    }
};
