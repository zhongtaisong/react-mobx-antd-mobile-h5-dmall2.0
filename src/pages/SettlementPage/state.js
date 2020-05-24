import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 收货地址
    @observable dataSource01 = [];
    @action setDataSource01 = (data = []) => {
        this.dataSource01 = data;
    }

    // 选择收件人
    @observable selectAddress = {};
    @action setSelectAddress = (data = {}) => {
        this.selectAddress = data;
    }

    // 商品详情
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 商品总数
    @observable num = 1;
    @action setNum = (data = 1) => {
        this.num = data;
    }

    // 商品总价
    @observable totalprice = 0;
    @action setTotalprice = (data = 0) => {
        this.totalprice = data;
    }

    // 每件商品对应的数量
    @observable nums = null;
    @action setNums = (data = null) => {
        this.nums = data;
    }

    // 查询结算页，收货地址，商品详情
    settlementData = async (id, type, num) => {
        const res = await service.settlementData({
            uname: sessionStorage.getItem('uname'),
            id, type
        });
        try{
            if( res.data.code === 200 ){
                let { address, productsInfo=[] } = res.data.data || {};
                if( type == 'detail' ){
                    productsInfo[0].num = num;
                }
                this.setDataSource01(address);
                this.setDataSource02(productsInfo);
                // 默认收件人
                let df = address.filter(item => item.isDefault == 1);
                df.length && this.setSelectAddress(df[0]);

                // 商品总价
                let totalprice = productsInfo.reduce((total, item, index, arr) => {
                    return total + item.price * item.num;
                }, 0);
                this.setTotalprice(totalprice);

                // 商品总数
                let tNum = productsInfo.reduce((total, item, index, arr) => {
                    return total + item.num;
                }, 0);
                this.setNum( tNum );

                // 每件商品对应的数量
                let nums = productsInfo.map(item => item.num);
                nums = nums.join(',');
                this.setNums(nums);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 提交订单
    addorderData = async (values = {}) => {
        const res = await service.addorderData(values);
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                return res.data.data;
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource01();
        this.setSelectAddress();
        this.setDataSource02();
        this.setNum();
        this.setTotalprice();
        this.setNums();
    }
}

export default new State();