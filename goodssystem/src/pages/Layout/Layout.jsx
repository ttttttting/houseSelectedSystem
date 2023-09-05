import React from "react";
import Nav from "../../components/nav/nav";
import "./Layout.css";

export default function Layout(props){
    return(
        <div className="wrapper">
            {/* 路由出口 */}
            <div className="content">
                {
                    props.children
                }
            </div>
            {/* 公共底部 */}
            <div className="footer">
                <Nav />
            </div>
        </div>
    )
}