export default {
  setupFiles: [
    "<rootDir>/jest.global-setup.js",
    "<rootDir>/jest.global-teardown.js"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["<rootDir>/src/__tests__/**/*.spec.ts"],
  clearMocks: true,
  coverageProvider: "v8",
  verbose: true,
}