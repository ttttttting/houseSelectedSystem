import { SET_CITY } from "../action/action-type";

/**
 * 城市
 * 1）初始化状态
 * 2）分支判断
 * 3）返回新状态
 */
export default function city(prevState='天津',action){
    let {type,payload}=action;
    let newState=prevState;
    switch(type){
        case SET_CITY:
            newState=payload
            return newState;
        default:
            return newState;

    }
}