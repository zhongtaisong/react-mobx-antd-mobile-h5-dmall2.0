import { action, observable } from 'mobx';

// 接口服务
import service from './service';

class State {

    // banner图片
    @observable carouselList = [];
    @action setCarouselList = (data = []) => {
        this.carouselList = data;
    }

    // 获取banner图片
    imgCarouselData = async () => {
        const res = await service.imgCarouselData();
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setCarouselList( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 单品推广 - 商品列表
    @observable productsList = [];
    @action setProductsList = (data = []) => {
        this.productsList = data;
    }

    // 单品推广
    productsListData = async () => {
        const res = await service.productsListData();
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setProductsList( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 本周热门商品列表
    @observable hotList = [];
    @action setHotList = (data = []) => {
        this.hotList = data;
    }

    // 查询本周热门商品
    hotListData = async () => {
        const res = await service.hotListData();
        try{
            if( res.data.code === 200 ){
                // const data = Array.from(new Array(9)).map((_val, i) => ({
                //     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                //     text: `name${i}`,
                // }));
                const { data=[] } = res.data || {};
                // let newData = data.map(item => ({
                //     icon: item.mainPicture,
                //     title: 
                // }));
                res.data.data && this.setHotList( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();