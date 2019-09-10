// 返回一些数据或者一些方法

module.exports = hammer => {
    return async ctx => {
        // https://github.com/pillarjs/cookies#readme
        const get = field => {
            const cookiesRes = ctx.req.headers.cookie
                .split(/;\s?/)
                .filter(Boolean)
                .reduce((cookies, item) => {
                    const [key, value] = item.split('=');
                    cookies[key] = value;
                    return cookies;
                }, {});
            return field ? cookiesRes[field] : cookiesRes;
        };
        const set = (field, value, opt) => {
            return ctx.cookies.set(field, value, opt);
        };

        return {
            get,
            set
        };
    };
};
