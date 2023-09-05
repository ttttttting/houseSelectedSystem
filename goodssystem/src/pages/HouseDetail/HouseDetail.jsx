import React from 'react'
import CommonHeader from '../../components/CommonHeader/CommonHeader'
import MyCarousel from '../../components/MyCarousel/MyCarousel'
import {Tabs} from 'antd'
import './HouseDeatil.css'
export default function HouseDetail(){
    const items = [
        {label:'房源信息',key:'house'},
        {label:'评论信息',key:'comment'}
    ]
    return (
        <div>
            <CommonHeader>详情页</CommonHeader>
            <MyCarousel list={[]}></MyCarousel>
            {/* 选项卡 */}
            <Tabs defaultActiveKey='1' items={items} centered>
            </Tabs>
            
        </div>
    )
}