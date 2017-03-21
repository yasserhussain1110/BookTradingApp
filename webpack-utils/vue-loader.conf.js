const utils = require('./utils');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction,
    extract: isProduction
  })
};
