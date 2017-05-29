const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  webpack (cfg) {
    // cfg.plugins = cfg.plugins.filter((plugin) => {
    //   if (plugin.constructor.name === 'UglifyJsPlugin') {
    //     return false
    //   } else {
    //     return true
    //   }
    // })
    cfg.resolve.aliasFields = ['browser']
    cfg.resolve.alias = {
      'react$': path.resolve(__dirname, './node_modules/react')
    }
    cfg.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    // cfg.plugins.push(new UglifyJSPlugin());
    return cfg
  },
}
