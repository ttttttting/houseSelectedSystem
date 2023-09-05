// 封装所有的请求函数
import Ajax from  './ajax'
import base from './base'

// 按需导出
// 获取首页轮播图的接口
export const getBanner=()=>{
    return Ajax.get(base.banner);
}
/** 获取首页热门房源列表
 * @param {*} params
 * @returns {city:'北京'}
 *  
*/

export const getHotHouse=(params)=>{
    return Ajax.get(base.hotHouse,{params});
}

export const getSearch=(params)=>Ajax.get(base.search,{params:params})