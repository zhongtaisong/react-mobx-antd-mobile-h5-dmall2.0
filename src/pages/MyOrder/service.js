import axios from '@axios';
// 查询
const selOrdersUrl = 'order/select';
// 删除
const deleteOrderUrl = 'order/delete';
// 订单详情
const detailOrdersUrl = 'order/detail';

class Service {

    selOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selOrdersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    deleteOrderData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(deleteOrderUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    detailOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(detailOrdersUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();