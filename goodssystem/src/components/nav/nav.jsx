import React from "react";
import { NavLink } from "react-router-dom";
import './nav.css';

// 注意：组件的首字母要大写否则会报错
export default function Nav(){
    return (
        <div className="nav">
            <div className="item">
                <NavLink exact to={'/'} activeClassName="Active">
                    <div className="icon-wrapper">
                        <i className="iconfont icon-shouye-zhihui"></i>
                        首页
                    </div>
                </NavLink>
                <NavLink to={'/shop'} activeClassName="Active">
                    <div className="icon-wrapper">
                        <i className="iconfont icon-dianpu"></i>
                        商城
                    </div>
                </NavLink>
                <NavLink to={'/live'} activeClassName="Active">
                    <div className="icon-wrapper">
                        <i className="iconfont icon-zaixianxuanfang"></i>
                        生活
                    </div>
                </NavLink>
                <NavLink to={'/mine'} activeClassName="Active">
                    <div className="icon-wrapper last">
                         <i className="iconfont icon-gerenzhongxin-zhihui"></i>
                        我的
                    </div>
                </NavLink>
            </div>
        </div>
    )
}