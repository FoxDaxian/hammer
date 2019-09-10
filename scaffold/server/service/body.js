module.exports = hammer => {
    return async (ctx, arg) => {
        return ctx.request.body;
    };
};
