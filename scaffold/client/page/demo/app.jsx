import './index.css';
import btn from '@components/btn';
import merge from 'lodash/merge';
// import lodash from 'lodash';
import {mapState, mapMutations} from 'vuex';
// console.log(lodash);

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
    mounted() {},
    render() {
        return (
            <div id='app' class='appclass'>
                {this.test}
                <btn />
                <btn />
                <div class='routerviewwrap'>
                    <router-view />
                </div>
                <button onClick={this.click}>跳转</button>
                <button onClick={this.click1}>跳转1</button>
                <button onClick={this.testStore}>store{this.count}</button>

                <img src='/img/qrcode.png' alt='' />
            </div>
        );
    }
};
