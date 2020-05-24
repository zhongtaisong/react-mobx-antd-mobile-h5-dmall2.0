import axios from '@axios';
// 查询商品
const productsUrl = 'comment/select/products';
// 提交评价
const addcommentsUrl = 'comment/add';

class Service {

    productsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(productsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcommentsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();