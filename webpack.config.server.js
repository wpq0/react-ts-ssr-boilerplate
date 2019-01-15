const path = require('path');
const nodeExternals = require('webpack-node-externals');
const transformGraphQL = require('ts-transform-graphql-tag').getTransformer;
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

module.exports = () => {
    return {
        name: 'server',
        target: 'node',
        mode: isProd ? 'production' : 'development',
        entry: {
            server: './src/server/index.ts',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'server.js',
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.join(
                            __dirname,
                            './tsconfig.server.json'
                        ),
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [transformGraphQL()],
                        }),
                    },
                },
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },
            ],
        },
        resolve: {
            extensions: [
                '.ts',
                '.tsx',
                '.mjs',
                '.js',
                '.jsx',
                '.json',
                '.gql',
                '.graphql',
            ],
        },
        devtool: 'source-map',
    };
};
