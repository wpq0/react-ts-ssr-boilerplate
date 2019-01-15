const paths = require('./paths');
const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'];
const modulePaths = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

module.exports = {
    extensions,
    modulePaths,
};
