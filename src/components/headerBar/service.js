import axios from '@axios';
// 关键字搜索
const kwUrl = 'index/kw';

class Service {

    kwData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(kwUrl, {
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