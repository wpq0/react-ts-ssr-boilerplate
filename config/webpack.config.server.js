const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const { extensions, modulePaths } = require('./resolvers');
const { tsxBabelLinaria, css, svg, graphql } = require('./loaders');
const { miniCssExtraction } = require('./plugins');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

module.exports = () => {
    return {
        name: 'server',
        target: 'node',
        mode: isProd ? 'production' : 'development',
        entry: {
            server: `${paths.srcServer}/index.ts`,
        },
        output: {
            path: paths.buildServer,
            filename: 'index.js',
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    oneOf: [tsxBabelLinaria, css, svg, graphql],
                },
            ],
        },
        resolve: {
            extensions: extensions,
            modules: modulePaths,
        },
        plugins: [
            miniCssExtraction,
            new webpack.DefinePlugin({
                __SERVER__: true,
            }),
        ],
        devtool: 'source-map',
    };
};
