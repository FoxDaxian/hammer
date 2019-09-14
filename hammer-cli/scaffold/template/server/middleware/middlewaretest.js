module.exports = args => {
    return async (ctx, next) => {
        console.log('模板的midderware');
        await next();
    };
};
