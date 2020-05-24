import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 详情图片 - 数据
    @observable pics = [];
    @action setPics = (data = []) => {
        this.pics = data;
    }

    // 详情图片 -发起请求
    introimgsData = async (lid) => {
        const res = await service.introimgsData({
            lid
        });
        try{
            if( res.data.code === 200 ){
                let data = res.data.data.filter(item => lid == item.lid);
                this.setPics( data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();