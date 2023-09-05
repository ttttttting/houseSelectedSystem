import Axios from 'axios';
import Nprogress from 'nprogress';

// 创建实例
const service = Axios.create({
    // 1.配置通用的基础路径和超时时间
    baseURL:'/api',
    timeout:5000
})
// 2.请求拦截
service.interceptors.request.use(config=>{
    // 显示请求进度条
    Nprogress.start();

    // 加token
    config.headers.token='';

    return config;
})
// 3.响应拦截
service.interceptors.response.use(res=>{
    // 结束进度条
    Nprogress.done();

    return res.data;
},err=>{
    return Promise.reject(err);
})

// 导出
export default service;