module.exports = {
    publicPath: process.env.VUE_APP_URL,

    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 8800,
        https: false,
        proxy: {
            '/usermanageapi': {
                target: 'http://127.0.0.1:8892/usermanage',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/usermanageapi': ''
                },
                secure: false
            },
            'shopmanageapi': {
                target: 'http://127.0.0.1:8893/shopmanage',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/shopmanageapi': ''
                },
                secure: false
            }
        }
    }
}