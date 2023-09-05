import React from "react";
import {Carousel,Image} from 'antd';

const contentStyle = {
    height:'160px',
    color:'#fff',
    lineHeight:'160px',
    textAlign:'center',
    marginTop:'0'
};

export default function MyCarousel(props){
    return(
        <>
            <Carousel autoplay>
                {
                    props.list.map((item,index)=>{
                        return <div key={item.id}>
                            <Image width={'100%'} height={150} src={item.imgUrl}></Image>      
                        </div>
                    })
                }
            </Carousel>
        </>
    )
}