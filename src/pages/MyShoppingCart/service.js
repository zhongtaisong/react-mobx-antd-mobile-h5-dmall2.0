import axios from '@axios';
// 查询
const cartListUrl = 'cart/select';
// 删除
const delcartUrl = 'cart/delete';
// 加入收藏
const addcolsUrl = 'collection/add';
// 更新商品数量
const updatecartUrl = 'cart/update/num';
// 查规格
const selectSpecUrl = 'cart/select/spec';
// 更改规格
const updateSpecUrl = 'cart/update/spec';
// 获取当前用户默认收货地址
const addressUrl = 'cart/select/address';

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
    
    updatecartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updatecartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    selectSpecData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectSpecUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    updateSpecData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateSpecUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(addressUrl, {
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