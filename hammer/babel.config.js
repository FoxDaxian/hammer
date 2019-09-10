const path = require('path');
const utils = require('./utils');
const cwd = process.cwd();
const styleExt = ['.scss', '.css', '.sass'];
const claer = ext => (require.extensions[ext] = () => {});
styleExt.forEach(claer);

require('core-js/stable');
require('regenerator-runtime/runtime');

// TODO 加上基本的webpack优化，暂时先不动了，最后在搞
const envConf = utils.merge(
    require(path.join(cwd, 'config', 'default.js')),
    require(path.join(cwd, 'config', `${process.env.NODE_ENV}.js`))
);

require('@babel/register')({
    babelrc: false,
    presets: [
        [
            require.resolve('@babel/preset-env'),
            {
                targets: {
                    node: 'current'
                }
            }
        ]
    ],
    plugins: [
        // TODO: 为什么classname没有正常编译
        require.resolve('babel-plugin-transform-vue-jsx'),
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: envConf.alias
            }
        ]
    ]
});
