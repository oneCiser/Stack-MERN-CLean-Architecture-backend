"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
const config = {
    verbose: true,
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    detectOpenHandles: false,
    testEnvironment: "node",
    coveragePathIgnorePatterns: ["/node_modules/"],
    setupFiles: ["<rootDir>/src/config/setup-tests.ts"],
    moduleDirectories: [
        "node_modules"
    ],
    testTimeout: 10000
};
exports.default = config;