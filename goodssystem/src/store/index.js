// 创建仓库
import {applyMiddleware, createStore} from 'redux';

// 导入reducers
import rootReducer from './reducers/index';

// 引入日志
import logger from 'redux-logger';

// 导出仓库
export default createStore(rootReducer,applyMiddleware(logger));