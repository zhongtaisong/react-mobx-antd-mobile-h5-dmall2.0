import axios from '@axios';
// 查询
const cartListUrl = 'cart/select';
// 删除
const delcartUrl = 'cart/delete';
// 加入购物车
const addcolsUrl = 'collection/add';

class Service {
    cartLisData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(cartListUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    delcartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(delcartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    addcolsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcolsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();