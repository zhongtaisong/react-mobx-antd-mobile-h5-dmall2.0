import { observable, action } from 'mobx';
import moment from 'moment';
// 接口服务
import service from './service';
// 全局公共方法
import { session } from '@utils';

class State {

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 个人资料 - 头像
    @observable avatar = null;
    @action setAvatar = (data = null) => {
        this.avatar = data;
    }

    // 查询 - 个人资料
    selectUserInfoData = async () => {
        if(!sessionStorage.getItem('uname')) return;
        const res = await service.selectUserInfoData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                if(data) {
                    data['birthday'] = data['birthday'] ? moment(data['birthday']) : null;
                    this.setPersonalInformation(data);
                    this.setAvatar(data['avatar']);
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 登录密码
    @observable loginPassword = {};
    @action setLoginPassword01 = (data = {}) => {
        this.loginPassword = data;
    }
    @action setLoginPassword02 = (key, value) => {
        this.loginPassword[key] = value;
    }
}

export default new State();