const paths = require('./paths');
const {
    tsxBabelLinaria,
    tsxBabelLinariaCached,
    css,
    svg,
    graphql,
} = require('./loaders');
const { extensions, modulePaths } = require('./resolvers');
const {
    html,
    forkTsChecker,
    miniCssExtraction,
    bundleAnalyzer,
} = require('./plugins');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
    const isProd = process.env.NODE_ENV === 'production';
    return {
        name: 'client',
        target: 'web',
        mode: isProd ? 'production' : 'development',
        entry: {
            app: `${paths.srcClient}/index.tsx`,
        },
        output: {
            path: paths.buildClient,
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[chunkhash:8].chunk.js',
        },
        resolve: {
            extensions: extensions,
            modules: modulePaths,
        },
        module: {
            rules: [
                {
                    oneOf: [
                        isProd ? tsxBabelLinaria : tsxBabelLinariaCached,
                        css,
                        svg,
                        graphql,
                    ],
                },
            ],
        },
        plugins: [html, forkTsChecker, miniCssExtraction, bundleAnalyzer],
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
