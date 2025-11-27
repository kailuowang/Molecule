module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'app.js',
    'lessons.js',
    '!node_modules/**'
  ],
  testMatch: [
    '**/__tests__/**/*.test.js'
  ]
};
