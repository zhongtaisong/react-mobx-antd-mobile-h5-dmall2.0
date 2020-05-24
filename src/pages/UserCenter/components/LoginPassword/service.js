import axios from '@axios';
// 修改登录密码
const updateUpwdUrl = 'users/update/upwd';

class Service {

    updateUpwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateUpwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

export default new Service();