const express = require('express');
var Mock = require('mockjs');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('测试成功')
})

router.get('/mock',(req,res)=>{
    const data = Mock.mock({
        'list|10':[
            {
                'id|+1':1,
                'title':'@cword(3,8)',
                'huxing|1':['一室一厅','两室一厅','三室两厅']
            }
        ]
    })

    res.send(data)
})
// 获取首页轮播图接口
router.get('/banner',(req,res)=>{
    const data = Mock.mock({
        status:200,
        'banner|3':[{
            'id|+1':1,
            'imgUrl|+1':[
                'http://iwenwiki.com/api/livable/banner/banner1.png',
                'http://iwenwiki.com/api/livable/banner/banner2.png',
                'http://iwenwiki.com/api/livable/banner/banner3.png'
            ]
        }]
    })

    res.send(data);
})
//获取热门房源接口
// 参数：{city:'北京'}
router.get('/hotHouse',(req,res)=>{
    let city = req.query.city||'北京';
    const data = Mock.mock({
        status:200,
        'list|10':[{
            'id|+1':1,
            address:city + '-@cword(3,8)',
            'huxing|1':['一室一厅','两室一厅','三室两厅'],
            'type|1':['整租','合租'],
            'price|2000-1000':1,//价格
            'area|50-120.2':1,//总面积
            'imgUrl|+1':[
                'http://iwenwiki.com/api/livable/banner/banner1.png',
                'http://iwenwiki.com/api/livable/banner/banner2.png',
                'http://iwenwiki.com/api/livable/banner/banner3.png'
            ]
        }]
    })

    res.send(data);
})
/** 
 * 搜索房源接口
*/
router.get('/search',(req,res)=>{
    let {city,val,page=0}=req.query;
    const data = Mock.mock({
        status:200,
        success:true,
        nextPage: +page +1,
        'list|10':[{
            'id|+1':1,
            address:city + '-@cword(3,8)',
            title:city + val + '- @cword(5,8)',
            'total|6-30':1,
            'current|1-30':1,
            floor:function(){
                if(this.total >= this.current){
                    return `${this.current}/${this.total}`
                }else{
                    return `${this.total}/${this.current}`
                }
            },
            'huxing|1':['一室一厅','两室一厅','三室两厅'],
            'type|1':['整租','合租'],
            'price|2000-1000':1,//价格
            'area|50-120.2':1,//总面积
            'imgUrl|+1':[
                'http://iwenwiki.com/api/livable/banner/banner1.png',
                'http://iwenwiki.com/api/livable/banner/banner2.png',
                'http://iwenwiki.com/api/livable/banner/banner3.png'
            ]
        }]
    })

    res.send(data);
})


module.exports=router;