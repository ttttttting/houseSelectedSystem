import React, { useEffect } from "react";
import { getSearch } from "../../api";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import MyInput from "../../components/MyInput/MyInput";
import SearchList from "./SearchList/SearchList"
import {connect} from "react-redux"
import { useState } from "react";
function Search(props){
    // 定义状态
    const [list,setList]=useState([]);    
    // 生命周期
    useEffect(()=>{
        getSearchList();
        async function getSearchList(){
            try{
                const res = await getSearch({city:props.city,val:props.match.params.val})
                // console.log(res);
                setList(res.list);
            }
            catch(error){
                console.log(error)
            }
        }
        
    },[props.city,props.match.params.val])
    return(
        <div>
            {/* 公共头部 */}
            <CommonHeader>
                <MyInput val={props.match.params.val}></MyInput>
            </CommonHeader>
            <div>
                当前进行搜索的关键词:{props.match.params.val}
            </div>
            {/* 搜索列表 */}
            <SearchList list={list}></SearchList>
        </div>
    )
}

export default connect(state=>({
    city:state.city
}))(Search) 