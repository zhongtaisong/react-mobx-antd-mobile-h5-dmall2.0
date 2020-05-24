import { observable, action, toJS } from "mobx";
import { Toast } from 'antd-mobile';
// 接口服务
import service from './service';

class State {

    // 我的收藏数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }
    
    // ListView行号
    @observable genData = {};
    @action setGenData = (data = {}) => {
        this.genData = data;
    }

    // 获取我的收藏列表数据 - 发起请求
    cartLisData = async () => {
        const res = await service.cartLisData({
            uname: sessionStorage.getItem('uname'),
            collection: 1
        });
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                if( data ){
                    this.setDataSource( data );
                    let genData = {};
                    data.map((item, index) => {
                        genData[item.id] = `row - ${item.id}`;
                    });
                    this.setGenData({...toJS(this.genData), ...genData});
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 取消收藏指定id数据
    delcartData = async (ids = []) => {
        const res = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                Toast.success(res.data.msg, 1);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入购物车
    addcolsData = async (cartId = []) => {
        const res = await service.addcolsData({ 
            uname: sessionStorage.getItem('uname'), 
            ids: cartId,
            collection: 0
        });
        try{
            if( res.data.code === 200 ){
                Toast.success(res.data.msg, 1);
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setGenData();
    }
}

export default new State();