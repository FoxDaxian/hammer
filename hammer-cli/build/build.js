const glob = require('glob');
const findCore = require('../utils/findCore');
const script = require('./script');

module.exports = (hammerConf, {watch}) => {
    const {dist} = hammerConf;
    const config = findCore('config');
    const pagePath = config.path.page;
    const webpackConf = {
        watch,
        entry: {},
        output: {
            path: dist,
            // when you use filename as a function, non-entry do not use this rules,
            // you need to asign chunkFilename to format chunk's name
            // filename applied to entry
            filename() {
                return '[name]/js/main.[hash].js';
            },
            // chunkFilename applied to non-entry
            chunkFilename: '[name].[chunkhash].js',
            publicPath: '/'
        }
    };
    const entryFileName = '/index.js';
    glob.sync(`${pagePath}/**${entryFileName}`).forEach(pageFile => {
        const key = pageFile.replace(pagePath, '').replace(entryFileName, '');
        webpackConf.entry[key] = pageFile;
    });
    script(webpackConf, hammerConf);
};
