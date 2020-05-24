import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// url前缀
import { PUBLIC_URL } from '@config';

class State {

    // form
    @observable form = {};
    @action setForm = (data = {}) => {
        this.form = data;
    }

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 错误提示
    @observable errTip = [];
    @action setErrTip = (data = []) => {
        this.errTip = data;
    }

    // -------------------- 上传图片 -------------------------- //
        // 上传图片 - 数据
        @observable fileListArr = [];
        @action setFileListArr = (data = []) => {
            this.fileListArr = data;
        }
    
        // 存储被删图片 - 数据
        @observable delList = [];
        @action setDelList = (data = []) => {
            this.delList = data;
        }
    // -------------------- 上传图片 -------------------------- //

    // 个人资料
    @observable personalInformation = {};
    @action setPersonalInformation = (data = {}) => {
        this.personalInformation = data;
    }

    // 个人资料 - 头像
    @observable avatar = [];
    @action setAvatar = (data = []) => {
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
                    data['birthday'] = data['birthday'] ? new Date(data['birthday']) : null;
                    data['gender'] = Array.from(data['gender']);
                    this.setPersonalInformation(data);
                    this.setAvatar([
                        {
                            id: data.id,
                            url: `${PUBLIC_URL}${data.avatar}`
                        }
                    ]);
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改 - 个人资料
    updateUserInfoData = async (values = {}) => {
        const res = await service.updateUserInfoData(values);
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                this.setDelList();
                window.History.goBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setForm();
        this.setPersonalInformation();
        this.setErrTip();
    }

}

export default new State();