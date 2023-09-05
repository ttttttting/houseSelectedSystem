import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router/AppRouter';
import {ConfigProvider} from 'antd';
import './assets/css/reset1.css';
import './assets/css/reset.css';
import zhCN from 'antd/locale/zh_CN';

// 连接redux(store)仓库跟component
import {Provider} from 'react-redux';
import store from './store/index';
import { setCityAction } from './store/action/actions';

// 从本地存储里取数据
if(localStorage.getItem('city')){
  store.dispatch(setCityAction(localStorage.getItem('city')));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ConfigProvider>
);
