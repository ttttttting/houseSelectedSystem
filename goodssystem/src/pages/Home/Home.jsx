import React from "react";
import HomeHeader from "./HomeHeader/HomeHeader";
import MyCarousel from '../../components/MyCarousel/MyCarousel'
import './Home.css';
import { useEffect } from "react";
import { getBanner,getHotHouse } from "../../api";
import { useState } from "react";
import House from "./House/House";
import { connect } from "react-redux";
// import banner1 from '../../components/images/banner1.png'
// import banner2 from '../../components/images/banner2.png'
// import banner3 from '../../components/images/banner3.png'
// import banner4 from '../../components/images/banner4.png'
// const list=[banner1,banner2,banner3,banner4]

function Home(props){
    // 定义变量
    let [list,setList]=useState([]);//热门房源
    let [houses,setHouses]=useState([]);//轮播图

    useEffect(()=>{
        // 发送请求
        // 书写异步代码
        // getBanner().then(res=>{
        //     // console.log(res);
        //     setList(res.banner);
        // }).catch(err=>{
        //     console.log(err);
        // })
        // 以同步的方式书写异步代码
        getHotHouseList();
        // 获取首页热门房源列表
        async function getHotHouseList(){
            try{
                const res = await getHotHouse({city:props.cityName});
                setHouses(res.list)
            }catch(err){
                console.log(err);
            }
        }
    },[props.cityName])
    useEffect(()=>{
        getBannerList();
        
    },[])
    // 获取轮播图列表
    async function getBannerList(){
        try{
            const res = await getBanner();
            setList(res.banner)
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <div>
            {/* 头部区域 */}
            <HomeHeader cityName={props.cityName}/>
            {/* 轮播图 */}
            <MyCarousel list={list}/>
            {/* 找室友 */}
            <div className="mate-nav">
                <div className="mate-item">找室友</div>
                <div className="mate-item">宜居社区</div>
            </div>
            {/* 热门房源 */}
            <House list={houses}></House>
            
        </div>
    )
}

export default connect(state=>({
    cityName:state.city
}))(Home)