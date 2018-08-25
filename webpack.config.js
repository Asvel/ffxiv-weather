const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env, argv) {
  const prod = argv && argv.mode === 'production';
  return {
    mode: prod ? 'production' : 'none',
    entry: './src/index.tsx',
    output: {
      filename: prod ? 'bundle-[hash:8].js' : 'bundle.js',
      path: __dirname + '/dist'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        {
          test: /\.css$/,
          use: ['style-loader', {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')(),
                prod && require('cssnano')(),
              ].filter(Boolean),
            }
          }]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.png',
      }),
    ],
    devtool: !prod && 'cheap-source-map',
    stats: {
      children: false,
      maxModules: 0,
    },
    serve: {
      devMiddleware: {
        logLevel: 'warn',
      },
      hotClient: false,
    },
  };
};
