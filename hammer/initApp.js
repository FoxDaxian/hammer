function createApp(Vue, context) {
    var entry = context.entry;
    var createRouter = context.createRouter;
    var createStore = context.createStore;
    var nodeBeforeCreate = context.nodeBeforeCreate;
    return function() {
        var router = createRouter();
        var store = createStore();
        var app = new Vue({
            render: h => h(entry),
            router,
            store,
            nodeBeforeCreate
        });

        if (typeof window !== 'undefined') {
            app.$mount('#app');
            store.replaceState(window.__INITIAL_STATE__);
        }

        return {app, router, store};
    };
}

module.exports = createApp;
