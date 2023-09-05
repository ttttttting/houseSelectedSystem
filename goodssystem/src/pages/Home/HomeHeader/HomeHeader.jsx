import React from "react";
import {Link} from "react-router-dom";
import './HomeHeader.css'
import MyInput from "../../../components/MyInput/MyInput";



export default function HomeHeader(props){
    return(
        <div className="home-header">
            {/* 左侧 */}
            <div className="address">
                <Link to={'/city'}>
                    <div className="address-wrapper">
                        {props.cityName}
                        <i className="iconfont icon-arrow-down"></i>
                    </div>
                </Link>
            </div>
            {/* 中间：搜索栏 */}
            <div className="search">
                <MyInput />
            </div>
            {/* 右侧 */}
            <div className="cart-wrapper">
                <div className="cart">
                    <i className="iconfont icon-icon-test"></i>
                </div>
            </div>
        </div>
    )
}

