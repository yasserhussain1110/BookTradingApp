module.exports = app => {
  const webpack = require('webpack');
  const webpackDevConfig = require('../../webpack.config.dev.js');
  const compiler = webpack(webpackDevConfig);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
  });

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({action: 'reload'});
      cb();
    })
  });

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  const uri = 'http://localhost:' + process.env.PORT;

  devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n');
  });
};
