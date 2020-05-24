import axios from '@axios';
// 详情图片
const introimgsUrl = 'details/introimgs';

class Service {
    introimgsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(introimgsUrl, {
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