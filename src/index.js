import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, Toast, Modal } from 'antd-mobile';
import App from './App';
import * as serviceWorker from './serviceWorker';
import md5 from 'js-md5';
// 国际化设置
import moment from 'moment';
import 'moment/locale/zh-cn';

// less根样式
import './index.less';
moment.locale('zh-cn');

window.Toast = (_this, content, duration) => {
    if( _this && Toast[_this] ){
        Toast[_this](content, duration);
    }else{
        console.log(`
            window.Toast，提供了三个参数：
            _this, content, duration，
            _this: 组件静态方法，如：info、success、fail等，
            content: 提示内容，
            duration：持续时间
        `);
    }
};

window.Alert = (title, message, 
    cancelCallBack=() => {
        return;
    }, confirmCallBack=() => {
        return;
    }
) => {
    Modal.alert(
        title, 
        message, 
        [
            { text: '取消', onPress: cancelCallBack },
            { text: '确定', onPress: confirmCallBack }
        ]
    );
};

React.Component.prototype.$md5 = md5;

ReactDOM.render(
    <LocaleProvider>
        <App />
    </LocaleProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
