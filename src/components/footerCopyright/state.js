import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 商品数量
    @observable productNum = 0;
    @action setProductNum = (data = 0) => {
        this.productNum = data;
    }

    // 获取购物车列表数据 - 发起请求
    productNumData = async () => {
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
        const res = await service.productNumData({ uname });
        try{
            if( res.data.code === 200 ){
                this.setProductNum( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();