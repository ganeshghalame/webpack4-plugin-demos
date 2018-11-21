const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    optimization: {
        usedExports: true      // This will show unused exports in bundle
    },
    plugins: [new HtmlWebPackPlugin()]
};
