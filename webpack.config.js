const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const include = [
  path.resolve(__dirname, './src'),
  path.resolve(__dirname, './docs'),
  path.resolve(__dirname, './website'),
  path.resolve(__dirname, './examples'),
  path.resolve(__dirname, './.cache'),
];

module.exports = {
  mode: process.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './website/index.tsx',
  output: {
    filename: 'hacker-ui-docs.js',
    publicPath: '/',
    path: path.resolve(__dirname, './public'),
    chunkFilename: '[id].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.rss-css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          'postcss-loader',
          '@react-style-system/loader',
        ],
        include: [
          ...include,
          require.resolve('@react-style-system/loader/load.rss-css'),
        ],
        sideEffects: true,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [
          path.resolve(__dirname, './.cache'),
          path.resolve(__dirname, './website'),
        ],
        exclude: [path.resolve(__dirname, './node_modules')],
        sideEffects: true,
      },
      {
        test: /\.doc-folder$/,
        include,
        use: [
          'babel-loader',
          { loader: path.resolve(__dirname, './loaders/docFolderLoader.js') },
        ],
      },
      {
        test: /\.example\.tsx$/,
        include,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/exampleLoader.js'),
            options: {
              cacheDir: path.resolve(__dirname, './.cache'),
            },
          },
        ],
        // TODO: sideEffects: true needs to be audited
        sideEffects: true,
      },
      {
        test: /\.mdx$/,
        include,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        include,
        exclude: [
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './examples'),
        ],
        loader: 'babel-loader',
        // TODO: sideEffects: true needs to be audited
        sideEffects: true,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mdx', '.doc-folder', '.css'],
    alias: {
      'hacker-ui': path.resolve(__dirname, './src/index.ts'),
      examples: path.resolve(__dirname, './examples'),
      website: path.resolve(__dirname, './website'),
    },
  },
  devtool: 'source-map',
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
};
