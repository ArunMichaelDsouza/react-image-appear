module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'react-image-appear.min.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css?$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    }
};