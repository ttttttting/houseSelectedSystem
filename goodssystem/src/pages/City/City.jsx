import React from "react";
import CityHeader from "./CityHeader/CityHeader"
import "./City.css"
import { connect } from "react-redux";
import { setCityAction } from "../../store/action/actions";
function City(props){
    function selectCity(name){
        // console.log(name);
        props.setCity(name);
        // 跳转页面
        props.history.goBack();
        // 持久化
        localStorage.setItem('city',name);
    }
    return(
        <div>
            {/* 头部 */}
            <CityHeader></CityHeader>
            {/* 当前城市和热门城市 */}
            <div className="city-box">
                <div className="city-title">
                    当前城市
                </div>
                <div className="city-name">
                    {props.cityName}
                </div>
            </div>
            <div className="city-box">
                <div className="city-title">
                    热门城市
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'北京')}>
                    北京  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'上海')}>
                    上海  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'天津')}>
                    天津  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'广州')}>
                    广州  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'杭州')}>
                    杭州  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'南京')}>
                    南京  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'厦门')}>
                    厦门  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'福州')}>
                    福州  
                </div>
                <div className="city-name" onClick={selectCity.bind(null,'青岛')}>
                    青岛  
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        setCity:(name)=>{dispatch(setCityAction(name))}
    }
}
export default connect(state=>({
    cityName:state.city
}),mapDispatchToProps)(City)