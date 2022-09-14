module.exports = {
  preset: "jest-expo",

  testPathIgnorePatterns: ["/android", "/ios", "/markdown", "/node_modules"],

  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
  ],

  setupFiles: ["<rootDir>/jestSetupFile.js"],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx"
  ],

  CoverageReporters: [
    'lcov'
  ]
};
