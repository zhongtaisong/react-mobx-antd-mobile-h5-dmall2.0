import { action, observable } from 'mobx';
// 接口服务
import service from './service';
// 全局数据
import $state from '@store';

class State {
    
    // 是否展示底部文字
    @observable isShowFooter = true;
    @action setIsShowFooter = (data = true) => {
        this.isShowFooter = data;
    }
    
    // 是否展示底部tab
    @observable isShowTab = true;
    @action setIsShowTab = (data = true) => {
        this.isShowTab = data;
    }
    
    // 是否展示顶部搜索栏
    @observable isShowHeader = true;
    @action setIsShowHeader = (data = true) => {
        this.isShowHeader = data;
    }

    // 是否展示顶部搜索栏logo
    @observable isShowLogo = false;
    @action setIsShowLogo = (data = false) => {
        this.isShowLogo = data;
    }

    // SearchBar：cancelText
    @observable cancelText = null;
    @action setCancelText = (data = null) => {
        this.cancelText = data;
    }

    // SearchBar：onCancel
    @observable onCancel = null;
    @action setOnCancel = (data = null) => {
        this.onCancel = data;
    }

    // 路由obj
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 是否展示paddingBottom: '5rem'
    @observable isPaddingBottm = true;
    @action setIsPaddingBottm = (data = true) => {
        this.isPaddingBottm = data;
    }

    // 发起账号认证
    oauthData = async () => {    
        const res = await service.oauthData();
        try{
            if( res.data.code === 200 ){
                const { data } = res.data || {};
                data.uname && $state.setUname( data.uname );
                data.token && $state.setToken( data.token );
                $state.setAdmin( data.admin );
            }else{
                $state.setUname();
                $state.setToken();
                $state.setAdmin();
            }
            $state.setOauthCode( res.data.code );
        }catch(err) {
            console.log(err);
        }
    }

    // 菜单 和 按钮 权限
    adminData = async () => {
        let uname;
        if( sessionStorage.getItem('uname') ){
            uname = sessionStorage.getItem('uname');
        }else{
            if( localStorage.getItem('uname') ){
                uname = localStorage.getItem('uname');
            }else{
                return;
            }
        }
        const res = await service.adminData({ uname });
        try{
            if( res.data.code === 200 ){
                res.data.data && $state.setAdminObj(res.data.data);
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();