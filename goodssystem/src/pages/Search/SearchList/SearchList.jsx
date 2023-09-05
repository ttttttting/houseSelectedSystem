import React from "react";
import "./SearchList.css";

export default function SearchList(props){
    return(
        <div className="house" id="searchList">
            <ul className="house-list">
                {
                    props.list.map((item,index)=>{
                        return (
                            <li className="house-item" key={index}>
                                <img src={item.imgUrl} alt="" width={'100%'}></img>
                                <div className="house-info">
                                    <div className="house-desc">
                                        <div>{item.address}</div>
                                        <div>{item.huxing}</div>
                                    </div>
                                    <div className="house-type">
                                        <div className="house-rent">
                                            {item.type}
                                        </div>
                                        <div className="house-price">{item.price}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )    
}