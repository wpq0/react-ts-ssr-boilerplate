const MiniCssExtractionPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

const tsxBabelLinaria = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
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
};
const tsxBabelLinariaCached = {
    test: /\.tsx?$/,
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
        ...tsxBabelLinaria.use,
    ],
};

const css = {
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
};

const svg = {
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
};

const graphql = {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
};

// const typescriptServer = {
//     test: /\.tsx?$/,
//     exclude: /node_modules/,
//     loader: 'ts-loader',
//     options: {
//         configFile: './tsconfig.server.json',
//         transpileOnly: true,
//     },
// };

module.exports = {
    tsxBabelLinaria,
    tsxBabelLinariaCached,
    css,
    svg,
    graphql,
};
