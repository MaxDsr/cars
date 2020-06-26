const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/app/main.js",
    mode: 'development',
    output: {
        filename: "main.js"
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './src/index.html',
            to: ''
        },
        {
           from: './src/images',
            to: './images'
        }])
    ]
};
