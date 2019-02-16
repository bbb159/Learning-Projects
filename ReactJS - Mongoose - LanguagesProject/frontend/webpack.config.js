const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin  = require('write-file-webpack-plugin');

module.exports = {
    entry: ['./src/app.js', 'font-awesome/scss/font-awesome.scss',],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
          {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(jpg|png)$/,
            use: {
              loader: "file-loader",
            }
          },
          {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000',
          },
          {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            use: 'file-loader',
          },
          {
            test: /font-awesome\.config\.js/,
            use: [
              { loader: 'style-loader' },
              { loader: 'font-awesome-loader' }
            ]
          }
    ]
    },
    // plugins: [
    //     new WriteFilePlugin(),
    //     new CopyWebpackPlugin([
    //       { from: './public/images', to: 'static/' },
    //     ])
    // ],
    
    //devtool: 'cheap-module-eval-source-map',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    }
};