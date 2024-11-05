import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testTimeout: 10000,
};

export default config;
