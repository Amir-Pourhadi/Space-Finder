import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/test", "<rootDir>/src"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/services/*", "!src/index.tsx"],
  moduleNameMapper: {
    "\\.(jpg|css)$": ["<rootDir>/test/mockData/mockFile.ts"],
    "^components/(.*)$": ["<rootDir>/src/components/$1"],
    "^services/(.*)$": ["<rootDir>/src/services/$1"],
    "^utils/(.*)$": ["<rootDir>/src/utils/$1"],
    "^assets/(.*)$": ["<rootDir>/src/assets/$1"],
  },
};

export default config;
