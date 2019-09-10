const Hammer = require('.');

const cwd = process.cwd();
const path = require('path');
const defaultConf = require(path.join(cwd, 'config', 'default.js'));
const envConf = require(path.join(cwd, 'config', `${process.env.NODE_ENV}.js`));

module.exports = new Hammer({
    ...defaultConf,
    ...envConf
});

