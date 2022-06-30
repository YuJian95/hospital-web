var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].js',
    // chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      /* {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
       },*/

      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import']
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: 'img/[name]-[hash:6].[ext]'
        }
      },
      {
        test: /\.(eot|woff|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    // noInfo: true,
    // overlay: true,
    hot: true,
    inline: true,
    stats: {colors: true},
    proxy: {
      '/hospital': {
        target: 'http://localhost:8080',
        pathRewrite: {['^' + process.env.VUE_APP_BASE_API]: '/'},
        changeOrigin: true
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
