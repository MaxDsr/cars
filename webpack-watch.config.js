const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/app/main.js",
    mode: 'development',
    output: {
        filename: "main.js"
    },
    watch : true,
    watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000,
        ignored: /node_modules/
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