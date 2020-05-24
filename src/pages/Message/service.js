import axios from '@axios';
// 查询当前商品评价
const selmessagesUrl = 'message/select';
// 喜欢 / 不喜欢 - 评价
const agreemessagesUrl = 'message/update/agree';
// 发表留言
const addMessagesUrl = 'message/add';

class Service {

    selmessagesData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selmessagesUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    agreemessagesData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(agreemessagesUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    addMessagesData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addMessagesUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }

}

export default new Service();