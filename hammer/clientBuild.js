const build = require('./build/build');
// const buildDll = require('./buildDll');
module.exports = (hammerConf, {watch = false, analyzer = false} = {}) => {
    if (process.env.NODE_ENV === 'development') {
        // buildDll()
    }
    build(hammerConf, {watch, analyzer});
};
