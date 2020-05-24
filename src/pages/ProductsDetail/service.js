import axios from '@axios';
// 商品规格 - 查询
const selectProductsDetailUrl = 'details/select';
// 加入购物车
const addcartUrl = 'cart/add';

class Service {

    selectProductsDetailData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectProductsDetailUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addcartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();