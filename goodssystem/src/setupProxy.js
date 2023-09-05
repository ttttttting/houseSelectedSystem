const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target:'http://localhost:7788',
            changeOrigin:true,//是否允许跨域
            pathRewrite:{
                '^/api':'',//路径重写
            }
        })
    );
};