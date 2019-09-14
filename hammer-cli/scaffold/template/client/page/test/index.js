import index from './app';
import Vue from 'vue';

// import _config from '@config';
import '@style/main.css';

const createApp = () => {
    const app = new Vue({
        render: h => h(index)
    });
    return {app};
};

createApp().app.$mount('#app');

export default createApp;
