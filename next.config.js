const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  webpack (cfg) {
    cfg.resolve.aliasFields = ['browser']
    cfg.resolve.alias = {
      'react$': path.resolve(__dirname, './node_modules/react')
    }
    cfg.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    )
    cfg.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    cfg.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/));
    return cfg
  },
}
