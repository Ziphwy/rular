module.exports = {
  root: true,
  "extends": "airbnb-base",
  plugins: [
    "import",
    "html"
  ],
  env: {
    "browser": true,
    "es6": true,
  },
  rules: {
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': [ "error", { allowShortCircuit: true } ],
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: './webpack.config.js'
      }
    }
  }
};