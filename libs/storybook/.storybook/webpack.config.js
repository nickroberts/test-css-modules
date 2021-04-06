const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const rootWebpackConfig = require('../../../.storybook/webpack.config');
/**
 * Export a function. Accept the base config as the only param.
 *
 * @param {Parameters<typeof rootWebpackConfig>[0]} options
 */
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  const tsPaths = new TsconfigPathsPlugin({
    configFile: './tsconfig.base.json',
  });

  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths]);

  // Found this here: https://github.com/nrwl/nx/issues/2859
  // And copied the part of the solution that made it work

  const svgRuleIndex = config.module.rules.findIndex((rule) => {
    const { test } = rule;

    return test.toString().startsWith('/\\.(svg|ico');
  });
  config.module.rules[
    svgRuleIndex
  ].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;

  config.module.rules.push(
    {
      test: /\.(png|jpe?g|gif|webp)$/,
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000, // 10kB
        name: '[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.svg$/,
      oneOf: [
        // If coming from JS/TS file, then transform into React component using SVGR.
        {
          issuer: {
            test: /\.[jt]sx?$/,
          },
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                svgo: false,
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
                esModule: false,
              },
            },
          ],
        },
        // Fallback to plain URL loader.
        {
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
      ],
    }
  );

  // return config;

  const baseConfig = config;

  // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
  const { module = {} } = baseConfig;

  const newConfig = {
    ...baseConfig,
    module: {
      ...module,
      rules: [...(module.rules || [])],
    },
  };

  // TypeScript with Next.js
  newConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      path.resolve(__dirname, '../..'),
      // path.resolve(__dirname, '../stories'),
    ],
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: ['react-docgen'],
        },
      },
    ],
  });
  newConfig.resolve.extensions.push('.ts', '.tsx');

  //
  // CSS Modules
  // Many thanks to https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
  //

  // First we prevent webpack from using Storybook CSS rules to process CSS modules
  newConfig.module.rules.find(
    (rule) => rule.test.toString() === '/\\.css$/'
  ).exclude = /\.module\.css$/;

  // Then we tell webpack what to do with CSS modules
  newConfig.module.rules.push({
    test: /\.module\.css$/,
    include: path.resolve(__dirname, '../../'),
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
    ],
  });

  return newConfig;
};
