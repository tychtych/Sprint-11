const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const path = require('path');

module.exports = {
    entry: {main: './src/js/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
            // Добавьте ещё одно правило:
            {

                test: /\.css$/, // применять это правило только к CSS-файлам
                use: [MiniCssExtractPlugin.loader, 'css-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}