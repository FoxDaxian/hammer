const build = require('./build');
// const buildDll = require('./buildDll');
module.exports = (hammerConf, {watch = false} = {}) => {
    if (process.env.NODE_ENV === 'development') {
        // buildDll()
    }
    build(hammerConf, {watch});
};
