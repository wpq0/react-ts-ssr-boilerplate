module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.post-setup.js'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    setupFiles: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['./node_modules', './src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '\\.svg': '<rootDir>/__mocks__/svgrMock.js',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
};
