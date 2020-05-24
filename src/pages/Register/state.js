import service from './service';
import { observable, action } from 'mobx';

class State {

    // 路由
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 错误提示
    @observable errTip = [];
    @action setErrTip = (data = []) => {
        this.errTip = data;
    }

    // 注册
    registerData = async ( values ) => {
        const res = await service.registerData(values);
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                window.Toast('success', '恭喜你，注册成功！');
                data && localStorage.setItem('uname', data); 
                this.history.push('/login');
            }else if( res.data.code === 201 ){
                window.Toast('fail', res.data.msg);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setHistory();
        this.setErrTip();
    }
}

export default new State();