import React from "react";
import "./CityHeader.css";
import { NavLink } from "react-router-dom";
export default function CityHeader(props){
    function returnBack(props){
        // props.history.goBack();
    }
    return(
        <div className="city-header">
            <NavLink to={'/'} activeClassName="Active">
                <i className="iconfont icon-arrow-left-bold"></i>
            </NavLink>
           
            <div className="city-title">
                城市选择
            </div>
        </div>
    )
}