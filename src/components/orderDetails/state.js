import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 收货人信息
    @observable consignees = {};
    @action setConsignees = (data = {}) => {
        this.consignees = data;
    }

    // 商品列表
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 付款信息
    @observable paymentInfo = {};
    @action setPaymentInfo = (data = {}) => {
        this.paymentInfo = data;
    }

    // 订单信息
    @observable orderInfo = {};
    @action setOrderInfo = (data = {}) => {
        this.orderInfo = data;
    }

    // 查询订单详情 - 发起请求
    detailOrdersData = async (obj = {}) => {
        const res = await service.detailOrdersData(obj);
        try{
            if( res.data.code === 200 ){
                const { address={}, orderInfo={}, productsInfo=[] } = res.data.data || {};
                address && this.setConsignees(address);
                orderInfo && this.setOrderInfo(orderInfo);
                productsInfo && this.setDataSource02(productsInfo);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setConsignees();
        this.setDataSource02();
        this.setPaymentInfo();
        this.setOrderInfo();
    }

}

export default new State();