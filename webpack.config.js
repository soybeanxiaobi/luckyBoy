var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/client/routes/index', //入口文件
    output: {
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js',  //打包后文件名
    },

    module: {
        loaders : [{
            test :/(\.jsx|\.js)$/,
            exclude : /node_modules/,
            loader :'babel-loader',
            options:{
                presets:[
                    "env", "react", 
                ]
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },
        {
            test: /\.(jpg|.png)$/,
            loader: 'url-loader'
        }

        ]
    },

    plugins: [
        //打包引用模板
        new HtmlWebpackPlugin({
            template: __dirname + '/client/views/template.html'
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
         })

    ]


}