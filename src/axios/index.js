import axios from "axios";
import { Toast } from 'antd-mobile';
// 设置
import { PUBLIC_URL } from '@config';
// 全局数据
import $state from '@store';

const $axios = axios.create({
    baseURL: PUBLIC_URL,
    timeout: 60 * 1000,
    withCredentials: true
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$axios.interceptors.request.use(
    config => {
        return config;
    }, 
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
$axios.interceptors.response.use(
    response => {
        const { config: { url }, data } = response || {};
        if( data ){
            $state.setIsLoading( false );
        }
        // 对响应数据做点什么
        return response;
    }, 
    error => {
        const { config: { url }, code, request, response } = error || {};
        if( code == 'ECONNABORTED' ){
            Toast.fail(`${ url } 请求超时！`);
            $state.setIsLoading( false );
        }
        if (error.response) {
            const { pathname } = window.location || {};
            const { data, status, request: { responseURL } } = error.response || {};
            switch (status) {
                case 404:
                    Toast.fail(data.msg );
                    break;
                // default:                    
                //     Toast.fail(data.msg );
            }
        }
        $state.setIsLoading( false );
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default $axios;