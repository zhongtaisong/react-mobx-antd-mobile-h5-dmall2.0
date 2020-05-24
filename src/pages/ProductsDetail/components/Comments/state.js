import { observable, action } from 'mobx';
import { message } from 'antd';
// 接口服务
import service from './service';

class State {

    @observable nums = [];
    @action setNums = (data = []) => {
        this.nums = data;
    }
    @action setNums02 = (index, key, value) => {
        this.nums[index][key] = value;
    }

    // 评价列表
    @observable commentList = [];
    @action setCommentList = (data = []) => {
        this.commentList = data;
    }

    // 商品评价 - 发起请求
    selcommentsData = async (params = {}) => {
        const res = await service.selcommentsData(params);
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                if(data){
                    this.setCommentList( res.data.data );
                    let nums = data.map(item => {
                        return ({
                            agree: item.agree,
                            disagree: item.disagree
                        });
                    });
                    this.setNums(nums);
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 喜欢 / 不喜欢 - 评价
    agreecommentsData = async (params = {}) => {
        const res = await service.agreecommentsData(params);
        try{
            if( res.data.code === 200 ){
                message.success(res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();