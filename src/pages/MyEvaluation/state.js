import { observable, action } from "mobx";
import { Toast } from 'antd-mobile';
// 接口服务
import service from './service';

class State {

    // 路由
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 商品
    @observable products = [];
    @action setProducts = (data = []) => {
        this.products = data;
    }

    // 查询商品
    productsData = async (values = {}) => {
        const res = await service.productsData(values);
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setProducts([res.data.data]);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价 - 发起请求
    addcommentsData = async (values = {}) => {
        const res = await service.addcommentsData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                Toast.success(res.data.msg, 1);
                setTimeout(() => {
                    this.history.goBack();
                }, 1000);
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();