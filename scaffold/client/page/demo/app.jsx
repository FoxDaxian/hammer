import './index.css';
import btn from '@components/btn';
import lodash from 'lodash';
import {mapState, mapMutations} from 'vuex';
// 引入一个alias后，如果报错，那么打包就不更新了，得重启才行，为什么？
// 还有config，还得给配置个index.js，有没有办法优化？
// import config from '@config';
// import client from '@client';
// console.log(config);

export default {
    data() {
        return {
            test: 'demopage'
        };
    },
    components: {
        btn
    },
    computed: {
        ...mapState(['count'])
    },
    methods: {
        onChange(e) {},
        click() {
            this.test = '跳转过去了';
            this.$router.push('/home/test');
        },
        click1() {
            this.$router.push('/home/test/profile');
        },
        testStore() {
            this.increment();
        },
        ...mapMutations(['increment'])
    },
    mounted() {
    },
    render() {
        return (
            <div id='app'>
                {this.test}
                <btn />
                <btn />
                <div class='routerviewwrap'>
                    <router-view />
                </div>
                <button onClick={this.click}>跳转</button>
                <button onClick={this.click1}>跳转1</button>
                <button onClick={this.testStore}>store{this.count}</button>
                
                <img src='/img/qrcode.png' alt=""/>
            </div>
        );
    }
};
