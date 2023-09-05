/**
 * 导出所有action
 */

import { SET_CITY } from "./action-type";

// 设置当前城市的action
export const setCityAction=(name)=>({type:SET_CITY,payload:name});