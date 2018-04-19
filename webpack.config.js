const path = require( 'path' );
// console.log( __dirname ); && node webpack.config.js for folder name

module.exports = {
    entry : './src/app.js',
    output : {
        path : path.join( __dirname, 'public' ), 
        filename : 'bundle.js'
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.s?css$/,
            use: [
                //Order should be accurate
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },{
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                } 
            }]
        }]
    },
    devtool: "cheap-module-eval-source-map", 
    devServer:{
        contentBase: path.join( __dirname, "public" ),
        compress: true,
        historyApiFallback: true
    }
};