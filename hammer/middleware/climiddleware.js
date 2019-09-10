module.exports = args => {
    return async (ctx, next) => {
        console.log('hammer自带的脚手架');
        await next();
    };
};
