export default {
    data() {
        return {
            test: '按钮'
        };
    },

    methods: {
        click() {
            console.log('点击按钮');
        }
    },
    render() {
        return (
            <button class='btnWrap' onClick={this.click}>
                {this.test}
            </button>
        );
    }
};
