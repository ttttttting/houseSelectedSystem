import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Task from './views/task(function)';
// 使用antd
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
// antd组件库自带按需导入

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Task/>
    {/* <Demo></Demo> */}
  </ConfigProvider>
);
