const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractionPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
    const isProd = process.env.NODE_ENV === 'production';
    const isDev = process.env.NODE_ENV === 'development';
    return {
        mode: isProd ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'app.[hash:8].js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
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
                template: './src/index.html',
                title: 'Typescript - Webpack Boilerplate',
            }),
            new ForkTsCheckerWebpackPlugin({
                checkSyntacticErrors: true,
                tslint: true,
                watch: ['./src'],
            }),
            new MiniCssExtractionPlugin({}),
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
