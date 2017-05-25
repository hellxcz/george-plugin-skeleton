var webpack = require('webpack');
var entry = './src/app/main.js',
    output = {
        path: __dirname,
        filename: 'bundle.js'
    },
    uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        },
        output: {
            comments: false
        }
    });

module.exports.development = {
    debug : true,
    devtool : 'eval',
    entry: entry,
    output: output,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    }
};

module.exports.production = {
    debug: false,
    entry: entry,
    output: output,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            {
               test: /\.hbs$/,
               loader: 'handlebars-loader',
              //  query: {
       			// 	      helperDirs: [ "./helpers" ]
   			     //   }
             }
        ]
    },
    externals: {
      backbone: "Backbone",
      marionette: "Backbone.Marionette"
    },

    plugins: [
        uglifyJsPlugin
    ]
};
