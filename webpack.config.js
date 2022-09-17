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
        logger: 'webpack-infrastructure',
      }),
    ],
    performance: {
      hints: false,
    },
    stats: {
      preset: 'errors-warnings',
      builtAt: true,
      timings: true,
    },
    devtool: !prod && 'cheap-source-map',
    devServer: {
      client: false,
      hot: false,
      liveReload: false,
      static: false,
    },
  };
};

// filter out logs like '[ForkTsCheckerWebpackPlugin] No errors found.', incredibly it can't be done by configuration
{
  const infrastructureLogger = require('fork-ts-checker-webpack-plugin/lib/infrastructure-logger');
  const { getInfrastructureLogger } = infrastructureLogger;
  infrastructureLogger.getInfrastructureLogger = function () {
    const ret = getInfrastructureLogger.apply(this, arguments);
    const { info } = ret;
    ret.info = function () {
      if (/^\u001b\[3[26]m/.test(arguments[0])) return;
      info.apply(this, arguments);
    };
    return ret;
  };
}
