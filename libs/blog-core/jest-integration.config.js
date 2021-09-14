const config = require('./jest.config')

// Para tests de integração o jest vai executar apenas testes com a extenção .test.ts
config.testMatch = ['<rootDir>/**/*.test.ts']

module.exports = config