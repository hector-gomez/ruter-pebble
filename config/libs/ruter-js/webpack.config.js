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
            { test: /\.ts(x?)$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    devtool: 'source-map'
};
