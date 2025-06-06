const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000', // Your backend URL
            changeOrigin: true,
        })
    );
};
