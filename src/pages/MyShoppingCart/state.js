import { observable, action, toJS } from "mobx";
// 接口服务
import service from './service';

class State {

    // 购物车数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }
    
    // ListView行号
    @observable genData = {};
    @action setGenData = (data = {}) => {
        this.genData = data;
    }

    // 规格列表
    @observable specList = [];
    @action setSpecList = (data = []) => {
        this.specList = data;
    }

    // 被选中
    @observable checkedObj = {};
    @action setCheckedObj = (data = {}) => {
        this.checkedObj = data;
    }
    @action setCheckedObj02 = (key, value) => {
        this.checkedObj[key] = value;
    }

    // 默认收货地址
    @observable address = null;
    @action setAddress = (data = null) => {
        this.address = data;
    }

    // 获取购物车列表数据 - 发起请求
    cartLisData = async () => {

        if( !sessionStorage.getItem('uname') ){
            return;
        };

        const res = await service.cartLisData({
            uname: sessionStorage.getItem('uname'),
            collection: 0
        });

        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                if( data ){
                    this.setCheckedObj();
                    this.setDataSource( data );
                    let genData = {};
                    data.map((item, index) => {
                        genData[item.id] = `row - ${item.id}`;
                        this.setCheckedObj02(item.id, false);
                    });
                    this.setGenData({...toJS(this.genData), ...genData});
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除购物车指定id数据
    delcartData = async (ids = []) => {
        const res = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入收藏
    addcolsData = async (cartId = []) => {
        const res = await service.addcolsData({ 
            uname: sessionStorage.getItem('uname'), 
            ids: cartId,
            collection: 1
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更新购物车数据
    updatecartData = async (id, num, totalprice) => {
        const res = await service.updatecartData({ 
            uname: sessionStorage.getItem('uname'), 
            id, num, totalprice
        });
        try{
            if( res.data.code === 200 ){
                let dataSource = toJS(this.dataSource);
                dataSource.map(item => {
                    if( item.id == id ){
                        item['num'] = num;
                        item['totalprice'] = totalprice;
                    }
                });
                this.setDataSource(dataSource);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询规格 - 发起请求
    selectSpecData = async (params = {}) => {
        const res = await service.selectSpecData(params);
        try{
            if( res.data.code === 200 ){
                this.setSpecList(res.data.data);
                return res.data.data || [];
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更改规格 - 发起请求
    updateSpecData = async (params = {}) => {
        const res = await service.updateSpecData(params);
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 查询当前用户默认地址
    addressData = async () => {
        const res = await service.addressData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { data={} } = res.data || {};
                if( Object.keys(data).length ){
                    this.setAddress(`${data.region}${data.detail}`);                    
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setGenData();
        this.setSpecList();
        this.setCheckedObj();
        this.setAddress();
    }
}

export default new State();