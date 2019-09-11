const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const CopyPlugin = require('copy-webpack-plugin');
const findCore = require('../utils/findCore');
const utils = findCore('utils');
const os = require('os');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const osLen = os.cpus().length;
const happyThreadPool = HappyPack.ThreadPool({size: 5});
const cwd = process.cwd();

// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = (config, hammerConf) => {
    const envConf = utils.merge(
        require(path.join(cwd, 'config', 'default.js')),
        require(path.join(cwd, 'config', `${process.env.NODE_ENV}.js`))
    );

    const isProd = process.env.NODE_ENV === 'production';
    const webpackConf = {
        mode: process.env.NODE_ENV,
        // https://webpack.docschina.org/configuration/stats/
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    include: hammerConf.path.client,
                    use: [
                        `${require.resolve('happypack/loader')}?id=babel-loader`
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /(node_modules|bower_components)/,
                    include: hammerConf.path.client,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {}
                        },
                        `${require.resolve('happypack/loader')}?id=scss`
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: /(node_modules|bower_components)/,
                    include: hammerConf.path.client,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {}
                        },
                        require.resolve('css-loader')
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new HappyPack({
                id: 'babel-loader',
                threads: osLen,
                verbose: false,
                threadPool: happyThreadPool,
                loaders: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    require.resolve('@babel/preset-env'),
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3
                                    }
                                ]
                            ],
                            plugins: [
                                require.resolve(
                                    'babel-plugin-transform-vue-jsx'
                                ),
                                [
                                    // https://github.com/babel/babel/issues/8829
                                    // https://babeljs.io/docs/en/babel-plugin-transform-runtime#technical-details
                                    // https://blog.hhking.cn/2019/04/02/babel-v7-update/
                                    require.resolve(
                                        '@babel/plugin-transform-runtime'
                                    ),
                                    {
                                        regenerator: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }),
            new HappyPack({
                id: 'scss',
                threads: osLen,
                verbose: false,
                threadPool: happyThreadPool,
                loaders: [
                    require.resolve('css-loader'),
                    require.resolve('sass-loader')
                ]
            }),
            // new VueSSRClientPlugin()
            new MiniCssExtractPlugin({
                filename: '[name]/css/main.[hash].css',
                chunkFilename: '[id].[chunkhash].css', // TODO
                ignoreOrder: false // Enable to remove warnings about conflicting order
            }),
            new CleanWebpackPlugin(),
            new CopyPlugin([
                {
                    from: hammerConf.path.static,
                    to: hammerConf.path.dist,
                    ignore: ['.DS_Store']
                }
            ])
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
            // 严格查找目录，减少时间
            // modules: [path.join(cwd, 'node_modules')],
            // how?
            mainFields: ['browser', 'module', 'main'],
            alias: envConf.alias
        },
        watchOptions: {
            aggregateTimeout: 300,
            ignored: ['server/**/*.js', 'node_modules', 'dist/**'],
            poll: 1000
        },
        externals: {
            // 依赖vue cdn
            vue: 'Vue'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    node_modules: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'initial',
                        priority: 2,
                        // used by chunkFilename
                        name(module, chunks, cacheGroupKey) {
                            if (
                                chunks.length ===
                                Object.keys(config.entry).length
                            ) {
                                return `common/vendors/${cacheGroupKey}`;
                            } else {
                                return `${chunks[0].name}/vendors/${cacheGroupKey}`;
                            }
                        }
                    }
                }
            }
        }
    };
    webpack(
        merge(
            webpackConf,
            config,
            isProd
                ? // 这是生产环境
                  {
                      // TODO: 把下面的换到上面来
                      devtool: 'none',
                      optimization: {
                          minimizer: [
                              new TerserPlugin({
                                  cache: true,
                                  parallel: true,
                                  sourceMap: false,
                                  terserOptions: {
                                      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                                  }
                              }),
                              new OptimizeCSSAssetsPlugin({})
                          ]
                      }
                  }
                : {
                      devtool: 'cheap-module-eval-source-map',
                      plugins: [new EmitAll()]
                  }
        ),
        (err, stats) => {
            if (err) {
                return console.log('构建出错');
            }
            console.log(
                stats.toString({
                    all: false,
                    colors: true,
                    assets: true,
                    modules: true,
                    maxModules: 0,
                    errors: true,
                    warnings: true,
                    moduleTrace: true,
                    errorDetails: true,
                    timings: true,
                    version: true,
                    chunkOrigins: true,
                    reasons: true,
                    publicPath: true
                })
            );
        }
    );
};

function EmitAll() {}
EmitAll.prototype.apply = function(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, function(
        compilation,
        callback
    ) {
        // if not as below, compilation.assets will not all output, need to understande deeper
        // 看看还有办法优化吗，现在是重新生成所有的js文件，会影响开发效率
        for (let k in compilation.assets) {
            if (/\.js$/.test(k)) {
                const source = compilation.assets[k].source();
                const size = compilation.assets[k].size();
                compilation.assets[k] = {
                    source: () => source,
                    size: () => size
                };
            }
        }

        callback();
    });
};
