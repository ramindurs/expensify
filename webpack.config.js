const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {loader: "babel-loader"}
                },
                {
                    test: /\.s?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                loader: "css-loader",
                                options:{
                                    sourceMap: true
                                },
                                hmr: process.env.NODE_ENV === 'development',
                                reloadAll: true,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options:{
                                sourceMap: true
                            },
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin("styles.css")
        ],
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: "bundle.js"
        },
        devtool: isProduction? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            compress: true,
            port: 8080,
            historyApiFallback: true
        }
    };
};
