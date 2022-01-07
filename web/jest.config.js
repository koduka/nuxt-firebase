module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'vue',
    'json'
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)'
  ]
}
