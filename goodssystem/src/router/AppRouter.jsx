import React from "react";
import {HashRouter as Router,Switch,Route} from "react-router-dom";
import Layout  from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import shop from "../pages/Shop/shop";
import live from "../pages/live/live";
import Mine from "../pages/Mine/Mine";
import City from '../pages/City/City';
import Search from "../pages/Search/Search";
import HouseDetail from "../pages/HouseDetail/HouseDetail";
export default function AppRouter(){
    return(
        <>
            <Router>
                <Switch>
                    {/* 城市选择列表 */}
                    <Route path={'/city'} component={City}></Route>
                    {/* 搜索 */}
                    <Route path={'/Search/:val'} component={Search}></Route>
                    {/* 房屋详细 */}
                    <Route path={'/housedetail/:id'} component={HouseDetail}></Route>
                    <Layout>
                        <Route exact path={'/'} component={Home}></Route>
                        <Route path={'/shop'} component={shop}></Route>
                        <Route path={'/live'} component={live}></Route>
                        <Route path={'/mine'} component={Mine}></Route>
                    </Layout>
                </Switch>
            </Router>
        </>
    )
}