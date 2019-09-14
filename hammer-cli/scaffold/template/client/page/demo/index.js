import index from './app';
import Vue from 'vue';
import {createRouter} from './router';
import createStore from './store';

import initApp from 'hammer/initApp';

const app = initApp(Vue, {
    entry: index,
    createRouter,
    createStore,
    nodeBeforeCreate({store}) {
        store.commit('increment');
    }
});
app();

export default app;
