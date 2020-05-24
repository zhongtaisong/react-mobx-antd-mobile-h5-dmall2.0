import axios from '@axios';
// 加入购物车
const addcartUrl = 'cart/add';

class Service {    
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