export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@components/(.*)": "<rootDir>/src/components/$1",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest-setup.ts"],
  testEnvironment: "jsdom",
};
