/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // ou 'node' si on ne teste que du backend
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
