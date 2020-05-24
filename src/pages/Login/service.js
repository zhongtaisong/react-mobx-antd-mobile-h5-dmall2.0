import axios from '@axios';

// 登录
const loginUrl = 'users/log';
// 忘记密码 - 信息验证
const forgetPwdUrl = 'users/vali/forgetPwd';
// 提交新密码
const newPwdUrl = 'users/update/upwd';

class Service {

    loginData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(loginUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    forgetPwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(forgetPwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    newPwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(newPwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
}

export default new Service();