const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),

    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].js",
        assetModuleFilename: "images/[hash][ext][query]"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]"
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html")
        })
    ]
};