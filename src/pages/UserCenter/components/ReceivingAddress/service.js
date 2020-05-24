import axios from '@axios';
// 添加 / 修改
const editAddressUrl = 'address/edit';
// 查询
const selAddressUrl = 'address/select';
// 删除
const delAddressUrl = 'address/delete';

class Service {

    editAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(editAddressUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    selAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selAddressUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    delAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(delAddressUrl, {
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