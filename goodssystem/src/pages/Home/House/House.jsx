import React from "react";
import './House.css';
import {useHistory} from "react-router-dom";
export default function House(props){
    const history = useHistory();
    function toDetail(id){
        history.push('/housedetail/'+id);
    }
    return(
        <div className="house">
            <h3 className="house-title">热门房源</h3>
            <ul className="house-list1">
                {
                    props.list.map(item=>{
                        return (
                            <li className="house-item" key={item.id} onClick={toDetail.bind(null,item.id)}>
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