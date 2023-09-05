import axios from "axios";
import qs from 'qs';
import { message } from "antd";
// import _ from '@/assets/utils';

const http = axios.create({
    baseURL:'/api',
    timeout:60000
})
// 对请求主体信息进行统一
http.defaults.transformRequest = data => {
    // isPlainObject判断是否是标准普通对象
    // if (_.isPlainObject(data)) 
    data = qs.stringify(data);
    return data;
}
// 响应拦截器
http.interceptors.response.use(response => {
    return response.data;
},reason => {
    //网络层失败：统一提示
    message.error('当前网络繁忙，请您稍后再试');
    return Promise.reject(reason)
});
export default http;