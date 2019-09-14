// 返回一些数据或者一些方法

module.exports = hammer => {
    return async (ctx, arg) => {
        return {
            name: arg,
            sex: 'man'
        };
    };
};
