const sleep = (time = 3000) => {
    return new Promise(res => {
        setTimeout(function() {
            res();
        }, time);
    });
};
import axios from 'axios';

export default {
    nodeBeforeCreate({store}) {
        store.commit('increment');
    },
    data() {
        return {
            name: 'fox'
        };
    },
    components: {},
    methods: {
        async asyncFn() {
            console.log('啦啦啦');
            await sleep();
            console.log('斤斤计较');
        }
    },

    async mounted() {
        axios({
            method: 'post',
            url: '/fox',
            data: {
                firstName: 'Fred',
                lastName: 'Flintstone'
            },
            params: {
                ID: 12345
            }
        })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        console.log('开始');
        await sleep();
        this.name = '测试async';
        console.log('结束');
    },
    render() {
        return (
            <div id='singleWrap' onClick={this.asyncFn}>
                改了啊{this.name}
            </div>
        );
    }
};
