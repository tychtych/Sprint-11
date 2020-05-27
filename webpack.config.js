const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const cssnano = require('cssnano');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {main: './src/js/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: 'images',
                            outputPath: 'images',
                            useRelativePath: true,
                            esModule: false,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    'file-loader?name=./vendor/[name].[ext]',
                ],
            },
            {
                test: /\.css$/i, // применять это правило только к CSS-файлам
                use: [
                    ( isDev ? 'style-loader': MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
                // к этим файлам нужно применить пакеты, которые мы уже установили
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new WebpackMd5Hash(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    },
                    canPrint: true
                }]
            },
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}