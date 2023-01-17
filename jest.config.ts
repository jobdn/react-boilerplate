export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@components/(.*)": "<rootDir>/src/components/$1",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest-setup.ts"],
  testEnvironment: "jsdom",
};
