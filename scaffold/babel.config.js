module.exports = function(api) {
    // https://babeljs.io/docs/en/config-files#project-wide-configuration
    api.cache.forever();
    // api.env() current env
    return {
        plugins: [
            [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true
                }
            ]
        ]
    };
};
