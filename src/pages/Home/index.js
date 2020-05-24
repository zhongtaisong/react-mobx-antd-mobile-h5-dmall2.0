import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// banner
import CarouselBox from './components/CarouselBox';
// 首页推荐
import Recommend from './components/Recommend';
// 宫格列表
import GridList from './components/GridList';
// 本周热门
import HotThisWeek from './components/HotThisWeek';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// 首页
@observer
class Home extends React.Component {

    componentDidMount() {
        state.productsListData();
        state.imgCarouselData();
        state.productsListData();
        state.hotListData();
        try {
            this.commonFc(this.props);
            this.props.setIsShowLogo && this.props.setIsShowLogo(true);
        } catch (error) {
            console.log(error);
        }
    }

    // message
    onMessage = () => {
        window.Toast('info', '暂未开放');
    }

    commonFc = (props) => {
        const { code, setCancelText, setOnCancel } = props || {};
        if( code == 200 ){
            setCancelText && setCancelText('留言');
            setOnCancel && setOnCancel(this.onMessage);
        }else {
            setCancelText && setCancelText('登录');
            setOnCancel && setOnCancel(this.onCancel);
        }
    }

    onCancel = () => {
        this.props.history.push('/login');
    }

    componentWillReceiveProps(nextProps) {
        this.commonFc(nextProps);
    }

    componentWillUnmount() {
        try {
            this.props.setCancelText && this.props.setCancelText();
            this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            this.props.setOnCancel && this.props.setOnCancel();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { carouselList=[], productsList=[], hotList=[] } = state;
        return (
            <div className='dm_Home'>
                <CarouselBox {...this.props} 
                    carouselList={ toJS(carouselList) }
                />
                {
                    productsList.length ? (
                        <Recommend {...this.props} 
                            productsList={ toJS(productsList) }
                        />
                    ) : ''
                }
                <GridList {...this.props} />
                {
                    hotList.length ? (
                        <HotThisWeek {...this.props} 
                            hotList={ toJS(hotList) }
                        />
                    ) : ''
                }
            </div>
        );
    }
}

export default Home;