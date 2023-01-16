const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const optimizationConfig = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (!isDev) {
    optimizationConfig.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ];
  }

  return optimizationConfig;
};

const plugins = () => {
  let basePlugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: isDev ? "[id].css" : "[id].[contenthash].css",
    }),
  ];

  if (!isDev) {
    basePlugins.push(new BundleAnalyzerPlugin());
  }

  return basePlugins;
};

module.exports = {
  context: path.join(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: "./index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@components": path.join(__dirname, "src", "components"),
    },
    extensions: [".ts", ".tsx", ".jsx", "..."],
  },

  devtool: "inline-source-map",

  optimization: optimization(),

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: plugins(),
  devServer: {
    hot: isDev,
    port: 3001,
    open: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
    client: {
      logging: "none",
    },
  },
};
