module.exports = {
    publicPath: process.env.VUE_APP_URL,

    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8800,
        https: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8900/easywork/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                },
                secure:false
            }
        }
    }
}