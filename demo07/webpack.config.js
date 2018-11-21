const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }],
            test: /\.(png|jpg)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]",
                },
            },
        }]
    },
    plugins: [new HtmlWebPackPlugin()]
};
