module.exports = {
    verbose: true,
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"]
  };
  