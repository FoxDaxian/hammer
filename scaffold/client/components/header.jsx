import './header.scss';

export default {
    data() {
        return {};
    },
    methods: {
        show() {
            console.log('点击header的show');
        }
    },
    render() {
        return (
            <div class='header'>
                <div class='avator'>头像</div>
                <div class='title' onClick={this.show}>title</div>
                <div class='menu'>菜单</div>
            </div>
        );
    }
};
