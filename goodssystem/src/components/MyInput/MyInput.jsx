import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const inputStyle={
    height:'20px',
    width:'180px',
    borderRadius:'2px',
    border:'1px solid #fff',
    color:'#333',
}

export default function MyInput(props){
    const [val,setVal]=useState('');
    const history=useHistory();
    // 获取文本框的输入
    function getInput(e){
        if(e.target){
            // console.log(e.target.value);
            setVal(e.target.value);
        }else{
            // console.log(e)
            setVal(e);
        }
        
    }
    // 键盘抬起事件
    function getKeyUp(e){
        if(e.keyCode === 13 && val){
            // 此时用户输入回车，跳转到搜索界面
            const road = '/search/'+val;
            history.push(road);
        }
    }

    // 生命周期
    useEffect(()=>{
        // if(props.val){
        // setVal(props.val);}
        if(props.val){
            getInput(props.val)
        }
    },[props.val])
    return(
        <>
            <input type="text" style={inputStyle} value={val} onChange={getInput} onKeyUp={getKeyUp} placeholder="请输入需要搜索的内容"/>
        </>
    )
}