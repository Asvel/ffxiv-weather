const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (env, argv) {
  const prod = argv && argv.mode === 'production';
  return {
    mode: prod ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      filename: prod ? 'bundle.[contenthash].js' : 'bundle.js',
      hashDigestLength: 10,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  jsx: prod ? 'react-jsx' : 'react-jsxdev',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['postcss-preset-env', { features: { 'case-insensitive-attributes': false } }],
                    prod && 'cssnano',
                  ].filter(Boolean),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/favicon.png',
      }),
      new ForkTsCheckerWebpackPlugin({
        async: !prod,
        logger: {
          issues: 'webpack-infrastructure',
        },
      }),
    ],
    stats: {
      preset: 'errors-warnings',
      builtAt: true,
      timings: true,
    },
    devtool: !prod && 'cheap-source-map',
    devServer: {
      hot: false,
      liveReload: false,
      injectClient: false,
      injectHot: false,
      static: false,
    },
  };
};
