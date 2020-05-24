import { observable, action } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 接口服务
import service from './service';

class State {

    // form
    @observable form = {};
    @action setForm = (data = {}) => {
        this.form = data;
    }

    // 登录密码
    @observable loginPassword = {};
    @action setLoginPassword01 = (data = {}) => {
        this.loginPassword = data;
    }

    // 错误提示
    @observable errTip = [];
    @action setErrTip = (data = []) => {
        this.errTip = data;
    }

    // 修改登录密码
    updateUpwdData = async (obj = {}) => {
        const res = await service.updateUpwdData({
            uname: session.getItem('uname'),
            ...obj
        });
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                setTimeout(() => {
                    window.location.replace('/login');
                }, 1000);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setForm();
        this.setLoginPassword01();
        this.setErrTip();
    }

}

export default new State();