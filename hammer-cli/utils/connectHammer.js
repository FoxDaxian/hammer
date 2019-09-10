const path = require('path');
const chalk = require('chalk');
const findCore = require('./findCore');
const utils = findCore('utils');
const cwd = process.cwd();

module.exports = cb => {
    const app = utils.require(path.resolve(cwd));
    if (!app) {
        console.log(chalk.red("Can't find hammer instance, please sure."));
        process.exit(1);
    }
    app.stop(() => cb && cb(app));
};
