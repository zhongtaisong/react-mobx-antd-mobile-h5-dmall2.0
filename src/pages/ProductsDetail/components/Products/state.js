import { observable, action } from 'mobx';
import { message } from 'antd';
// 接口服务
import service from './service';

class State {

    // 路由对象
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 加入购物车 - 发起请求
    addcartData = async (list = []) => {
        const res = await service.addcartData({ 
            uname: sessionStorage.getItem('uname'), 
            list
        });
        try{
            if( res.data.code === 200 ){
                message.success('成功加入购物车！');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();