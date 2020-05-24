import { observable, action, toJS } from 'mobx';
// 接口服务
import service from './service';
// 全局数据
import $state from '@store';
// 全局设置
import { indexState } from '@config';

// 一页展示多少条数据
const SIZE = 20;

class State {

    // 关键字
    @observable kw = '';
    @action setKw = (data = '') => {
        this.kw = data;
    }

    // 当前页
    @observable current = 1;
    @action setCurrent = (data = 1) => {
        this.current = data;
    }

    // 一页多少条数据
    @observable pageSize = SIZE;
    @action setPageSize = (data = SIZE) => {
        this.pageSize = data;
    }

    // 数据总数
    @observable total = SIZE;
    @action setTotal = (data = SIZE) => {
        this.total = data;
    }

    // 产品列表
    @observable productList = [];
    @action setProductList = (data = []) => {
        this.productList = data;
    }

    // 商品筛选所有条件
    @observable filterList = [];
    @action setFilterList = (data = []) => {
        this.filterList = data;
    }
    
    // ListView行号
    @observable genData = {};
    @action setGenData = (data = {}) => {
        this.genData = data;
    }
    
    // 存储已选的筛选条件
    @observable checkedObj = {};
    @action setCheckedObj = (data = {}) => {
        this.checkedObj = data;
    }
    @action setCheckedObj02 = (key, value) => {
        let checkedObj = toJS(this.checkedObj);
        checkedObj[key] = value;
        this.checkedObj = checkedObj;
    }

    // 查询全部商品 - 发起请求
    productsData = async () => {
        const res = await service.productsData({
            current: this.current,
            pageSize: this.pageSize,
            onLine: 100,
            filterList: this.checkedObj
        });
        try{
            if( res.data.code === 200 ){
                let { products=[], current, pageSize, total } = res.data.data || {};
                let genData = {};
                products.map((item, index) => {
                    genData[item.id] = `row - ${item.id}`;
                    return item['key'] = index + 1;
                });
                this.setGenData({...toJS(this.genData), ...genData});
                this.setProductList([...toJS(this.productList), ...products]);
                this.setCurrent( current );
                this.setPageSize( pageSize );
                this.setTotal( total );
                return products;
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 商品筛选条件
    filterData = async () => {
        const res = await service.filterData();
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setFilterList(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }
    
    // 头像 和 昵称
    @observable unameInfo = {};
    @action setUnameInfo = (data = {}) => {
        this.unameInfo = data;
    }

    // 获取当前用户信息
    selectUserInfoData = async () => {
        if(!sessionStorage.getItem('uname')) return;
        const res = await service.selectUserInfoData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { avatar, nickName } = res.data.data || {};
                this.setUnameInfo({ avatar, nickName });
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 退出登录
    logoutData = async () => {
        const res = await service.logoutData();
        try{
            if( res.data.code === 200 ){
                $state.setUname( res.data.data );
                let uname = sessionStorage.getItem('uname');
                uname && localStorage.setItem('uname', uname);
                sessionStorage.clear('uname');
                indexState.oauthData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setKw();
        this.setCurrent();
        this.setPageSize();
        this.setTotal();
        this.setProductList();
        this.setFilterList();
        this.setGenData();
        this.setCheckedObj();
    }
}

export default new State();