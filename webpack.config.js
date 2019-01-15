const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractionPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
    const isProd = process.env.NODE_ENV === 'production';
    const isDev = process.env.NODE_ENV === 'development';
    return {
        name: 'client',
        target: 'web',
        mode: isProd ? 'production' : 'development',
        entry: {
            app: './src/client/index.tsx',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[chunkhash:8].chunk.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    //loader: 'babel-loader',
                    exclude: /node_modules/,
                    use: [
                        { loader: 'cache-loader' },
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                workers: require('os').cpus().length - 1,
                            },
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            },
                        },
                        {
                            loader: 'linaria/loader',
                            options: {
                                sourceMap: isDev,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractionPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDev,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.svg$/,
                    issuer: {
                        test: /\.(jsx|tsx)?$/,
                    },
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                svgo: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/shared/public/index.html',
                title: 'Typescript - Webpack Boilerplate',
            }),
            new ForkTsCheckerWebpackPlugin({
                checkSyntacticErrors: true,
                tslint: true,
                watch: ['./src'],
            }),
            new MiniCssExtractionPlugin({
                filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
                chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css',
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                }),
            ],
        },
        devtool: 'source-map',
        devServer: {
            port: 9000,
            historyApiFallback: true,
            overlay: {
                errors: true,
                warnings: true,
            },
        },
    };
};
