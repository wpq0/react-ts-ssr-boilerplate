const paths = require('./paths');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractionPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const html = new HtmlWebpackPlugin({
    template: `${paths.srcShared}/public/index.html`,
});

const forkTsChecker = new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
    tslint: true,
    watch: [paths.srcClient], //TODO: server?
});
const miniCssExtraction = new MiniCssExtractionPlugin({
    filename: isDev ? '[name].css' : '[name].[contenthash:8].css',
    chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css',
});
const bundleAnalyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
});

module.exports = {
    html,
    forkTsChecker,
    miniCssExtraction,
    bundleAnalyzer,
};
