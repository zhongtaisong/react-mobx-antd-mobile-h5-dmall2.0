import { action, observable } from 'mobx';

class State {

    // 用户名
    @observable uname = '';
    @action setUname = (data = '') => {
        this.uname = data;
    }

    // 是否有超级管理员权限
    @observable admin = 0;
    @action setAdmin = (data = 0) => {
        this.admin = data;
    }

    // 认证code
    @observable oauthCode = null;
    @action setOauthCode = (data = null) => {
        this.oauthCode = data;
    }

    // token
    @observable token = null;
    @action setToken = (data = null) => {
        this.token = data;
    }

    // 是否显示loading
    @observable isLoading = false;
    @action setIsLoading = (data = false) => {
        this.isLoading = data;
    }

    // 菜单 和 按钮 权限
    @observable adminObj = {};
    @action setAdminObj = (data = {}) => {
        this.adminObj = data;
    }

}

export default new State();