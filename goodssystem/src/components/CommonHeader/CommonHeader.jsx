import React from "react";
import "./CommonHeader.css";
import { NavLink } from "react-router-dom";
export default function CommonHeader(props){
    return(
        <div className="city-header">
            <NavLink to={'/'} activeClassName="Active">
                <i className="iconfont icon-arrow-left-bold"></i>
            </NavLink>
            <div className="title">
                {/* 预留空间 */}
                {props.children}
            </div>
        </div>
    )
}