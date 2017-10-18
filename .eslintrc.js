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
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: './webpack.base.config.js'
      }
    }
  }
};