import axios from '@axios';
// 查询结算页，收货地址，商品详情
const settlementUrl = 'order/select/settlement';
// 提交订单
const addorderUrl = 'order/add';

class Service {

    settlementData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(settlementUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    addorderData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addorderUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();