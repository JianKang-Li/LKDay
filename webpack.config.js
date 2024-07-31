const path = require('path')

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: isProduction ? "./src/LDay.js" : {
    index: "./src/index.js",
    LDay: "./src/LDay.js"
  },
  output: isProduction ? {
    path: path.resolve(__dirname, "dist"),
    filename: "LDay.js",
    library: "LDay",// 在全局变量中增加一个library变量
    libraryTarget: "umd",
    libraryExport: 'default',
    clean: true,
    globalObject: 'this'
  } : {
    path: undefined,
    filename: "[name].[contenthash].js",//打包后的文件名称
    clean: true,
  },
  module: {
    rules: [
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.cjs', '.json'] //配置文件引入时省略后缀名
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: isProduction ? undefined : 'single'
  },
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  mode: isProduction ? 'production' : 'development'
}