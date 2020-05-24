import axios from '@axios';
// 查询 - 个人资料
const selectUserInfoUrl = 'users/select/uname';

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

}

export default new Service();