import axios from '@axios';
// 查询当前商品评价
const selcommentsUrl = 'comment/select/pid';
// 喜欢 / 不喜欢 - 评价
const agreecommentsUrl = 'comment/update/agree';

class Service {

    selcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selcommentsUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    agreecommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(agreecommentsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();