import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 搜索结果
    @observable searchResultList = [];
    @action setSearchResultList = (data = []) => {
        this.searchResultList = data;
    }

    // 抱歉！暂无相关商品
    @observable isShowNoResult = false;
    @action setIsShowNoResult = (data = false) => {
        this.isShowNoResult = data;
    }

    // 关键字搜索结果 - 发起请求
    kwData = async (kw = '') => {
        const res = await service.kwData({
            kws: kw,
        });
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                if( data ){
                    this.setSearchResultList(data);
                    if( data.length ) {
                        this.setIsShowNoResult(false);
                    }else {
                        this.setIsShowNoResult(true);
                    }
                }
            }
            return res.data.code;
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();