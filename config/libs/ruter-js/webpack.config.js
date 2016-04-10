var webpack = require('webpack');

module.exports = {
    entry: './src/Ruter.ts',
    output: {
        filename: './dist/ruter.js',
        libraryTarget: 'var',
        library: 'Ruter'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader!ts-loader',
                test: /\.ts(x?)$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'source-map'
};
