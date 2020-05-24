import axios from '@axios';
// 查询 - 个人资料
const selectUserInfoUrl = 'users/select/uname';
// 查询全部商品
const productsUrl = 'products/select';
// 商品筛选条件
const filterUrl = 'products/select/filter';
// 退出登录
const logoutUrl = `users/logout`;

class Service {

    selectUserInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectUserInfoUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    productsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(productsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    filterData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(filterUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    logoutData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(logoutUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();