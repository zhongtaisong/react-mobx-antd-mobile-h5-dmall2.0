import axios from '@axios';
// 账号认证
const oauthUrl = `users/oauth`;
// 菜单 和 按钮 权限
const adminUrl = `admin/select/uname`;

class Service {

    oauthData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(oauthUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
    
    adminData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(adminUrl, {
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