module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default', [
            'jest-html-reporters',
            {
                filename: 'report.html',
                expand: true,
                pageTitle: 'BankReport'
            }
        ]
    ],

    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/specs/*.spec.*'], // ['**/specs/*.spec.*']
    globals: {
        testTimeout: 200000, //200с=3мин
    },
    verbose: true,
    setupFilesAfterEnv: ["jest-allure/dist/setup"]


};