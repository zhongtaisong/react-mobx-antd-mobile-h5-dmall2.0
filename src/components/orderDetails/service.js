import axios from '@axios';
// 订单详情
const detailOrdersUrl = 'order/detail';

class Service {
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