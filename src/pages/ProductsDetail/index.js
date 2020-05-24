import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Badge } from 'antd-mobile';
// 商品
import Products from './components/Products';
// 详情
import Details from './components/Details';
// 评价
import Comments from './components/Comments';
// 全局公共组件
import { NavBar } from '@com';
// 全局设置
import { footerCopyrightState } from '@config';
// 数据
import indexState from './state';
// 全局数据
import $state from '@store';
// 样式
import './index.less';

const tabs = [
    { title: '商品' },
    { title: '评价' },
    { title: '详情' }
];

// 商品详情
@observer
class ProductsDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 1
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        id && indexState.selectProductsDetailData({ id });
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.match.params.id && nextProps.match.params.id && this.props.match.params.id != nextProps.match.params.id ){
            nextProps.match.params.id && indexState.selectProductsDetailData({
                id: nextProps.match.params.id
            });
        }
    }

    // 加入购物车
    handleAddCart = () => {
        const { basicInfo={} } = indexState;
        if( basicInfo ){
            indexState.addcartData([{
                pid: basicInfo.id,
                num: this.state.num,
                totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
            }]);
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { basicInfo={} } = indexState;
        const { id } = basicInfo;
        id && this.props.history.push({
            pathname: '/views/products/cart/settlement',
            state: {
                id: [id],
                num: this.state.num,
                type: 'detail'
            }
        });
    }

    // 数量
    watchNumber = (value) => {
        this.setState(() => ({
            num: value
        }));
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { basicInfo, imgList, specs, params, detailsPic } = indexState;
        const { oauthCode } = $state;
        return (
            <div className='dm_ProductsDetail'>
                <NavBar {...this.props} title='商品详情' 
                    rightContent={[
                        <div
                            onClick={ () => this.props.history.push({
                                pathname: '/views/cart',
                                state: {
                                    type: 'temp'
                                }
                            }) }
                        >
                            <Badge text={ toJS(footerCopyrightState.productNum ) } overflowCount={ 99 } className='rightContent_Badge'>
                                <img src={ require('@img/svg/cart.svg') } alt='cart' style={{ width: '22px', height: 'auto' }} />
                            </Badge>
                        </div>
                    ]}
                />
                <div className='main_content'>
                    <Products 
                        {...this.props}
                        basicInfo={ toJS(basicInfo) || {} }
                        imgList={ toJS(imgList) || [] }
                        specs={ toJS(specs) || [] }
                        watchNumber={ this.watchNumber }
                        num={ this.state.num }
                    />
                    {
                        params.id ? (
                            <Comments 
                                {...this.props}
                                pid={ params.id || '' }
                            />
                        ) : ''
                    }
                    <Details 
                        {...this.props}
                        params={ toJS(params) || {} }
                        detailsPic={ toJS(detailsPic) || [] }
                    />
                </div>
                {
                    oauthCode && oauthCode == 200 ? (
                        <div className='bottom_tab_btns'>
                            <span onClick={ this.handleAddCart }>加入购物车</span>
                            <span onClick={ this.immediatePurchase }>立即购买</span>
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

export default ProductsDetail;