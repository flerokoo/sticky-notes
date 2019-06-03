const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ProvidePlugin = require("webpack").ProvidePlugin;
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
    mode: "development",
    entry: "./app/client.js",    
    output: {
        path: path.join(__dirname, "public/js/"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(scss|css|sass)$/,
                use: [                    
                    "style-loader",
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: "./css/"
                        }
                    },
                    "css-loader",                    
                    "sass-loader",
                    "postcss-loader"                    
                ]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: '../css/[name].css',
            chunkFilename: '../css/[id].css',
        })
    ]
};

const serverConfig = {
    mode: "development",
    target: "node",
    externals: [nodeExternals(), /^(?!\.|\/).+/i],
    entry: "./app/server.js",
    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "server.js",
        libraryTarget: "commonjs"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                },
            }
        ]
    },
    plugins: [
        new ProvidePlugin({
            "React": "react"
        })
    ]
}


module.exports = {clientConfig, serverConfig}