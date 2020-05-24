import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // form
    @observable form = {};
    @action setForm = (data = {}) => {
        this.form = data;
    }

    // 收货地址 - 表格 - 数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 模态框 - 数据
    @observable addressModalData = {};
    @action setAddressModalData = (data = {}) => {
        this.addressModalData = data;
    }

    // 错误提示
    @observable errTip = [];
    @action setErrTip = (data = []) => {
        this.errTip = data;
    }

    // 添加收货地址 / 修改收货地址
    editAddressData = async (values = {}) => {
        const res = await service.editAddressData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                this.selAddressData();
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

    // 查询收货地址
    selAddressData = async () => {
        // 清除mobx数据
        this.clearMobxData();
        const res = await service.selAddressData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setDataSource(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除收货地址
    delAddressData = async (obj = {}) => {
        const res = await service.delAddressData(obj);
        try{
            if( res.data.code === 200 ){
                window.Toast('success', res.data.msg);
                this.selAddressData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 清除mobx数据
    clearMobxData = () => {
        this.setDataSource();
        this.setAddressModalData();
        this.setErrTip();
    }

}

export default new State();