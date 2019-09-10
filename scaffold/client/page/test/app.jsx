import './index.scss';
// import lodash from 'lodash';
import config from '@config/development';
import myHeader from '@components/header.jsx';
// import moment from 'moment';

export default {
    data() {
        return {
            test: '点击2事件'
        };
    },
    components: {
        myHeader
    },

    mounted() {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    },
    methods: {
        click() {
            var foo = {name: '冯世雨'};
            var bar = {age: 23};

            var result = lodash.assign(
                {name: '这个被覆盖了', _default: '默认'},
                foo,
                bar
            );
            console.log(result);
            this.test = '我2被点击1了';
        },
        jumpAction() {
            window.location = '/fox';
        }
    },
    render() {
        return (
            <div id='app' onClick={this.click}>
                <my-header />
                {process.env.NODE_ENV}
                <div>
                    <div class='name'>{this.test}</div>
                    <div class='age'>这绝对2全都删了</div>
                    <div class='age'>其他的新增的123</div>
                    <div class='jump' onClick={this.jumpAction}>
                        跳转
                    </div>
                </div>
            </div>
        );
    }
};
