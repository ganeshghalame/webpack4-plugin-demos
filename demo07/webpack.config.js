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
            }]
        }]
    },
    plugins: [new HtmlWebPackPlugin()]
};
