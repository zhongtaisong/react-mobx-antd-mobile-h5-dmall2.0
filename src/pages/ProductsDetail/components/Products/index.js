import React from 'react';
import { observer } from 'mobx-react';
import { List, Carousel } from 'antd-mobile';
// 全局公共组件
import { Stepper, ActionSheet } from '@com';
// 设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if( isIPhone ) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

// 商品规格
@observer
class CommoditySpecification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionIndex: 0,
            num: 1,
            imgHeight: 360
        };
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    // 选择规格
    handleToggleSpecs = (id) => {
        if( id ){
            this.props.history.push(`/views/products/detail/${id}`);
            this.setState(() => ({
                num: 1,
                actionIndex: 0
            }));
        }
    }

    // 加入购物车
    handleAddCart = () => {
        const { basicInfo } = this.props;
        if( basicInfo ){
            state.addcartData([{
                pid: basicInfo.id,
                num: this.state.num,
                totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
            }]);
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { basicInfo={} } = this.props;
        const { id } = basicInfo;
        id && this.props.history.replace({
            pathname: '/views/products/cart/settlement',
            state: {
                id,
                num: this.state.num,
                type: 'detail'
            }
        });
    }

    // 获取活动面板 - 按钮索引
    getBtnsIndex = (index) => {
        const { specs=[] } = this.props;
        if( specs.length != index ){
            this.handleToggleSpecs(specs[index].id);
        }
    }
    
    // 选择规格 - 活动面板
    showActionSheet = async (obj = [], spec) => {
        let BUTTONS = obj.map(item => item.spec);
        BUTTONS.push('关闭');

        let i = BUTTONS.indexOf(spec);
        let activeIndex = i > -1 ? i : 0;

        ActionSheet({ 
            props: this.props, 
            btns: BUTTONS, 
            className: 'ProductsDetail_Products_sheet', 
            params: {}, 
            getBtnsIndex: this.getBtnsIndex, 
            activeIndex
        });
    }

    render() {
        const { basicInfo, imgList, specs, watchNumber, num } = this.props;
        return (
            <div className='Products_ProductsDetail'>
                <div className='big_img'>
                    <Carousel
                        autoplay={ false }
                        infinite
                        dotStyle={{ background: '#D6D6D6' }}
                        dotActiveStyle={{ background: '#1890ff' }}
                    >
                        {
                            imgList.map((item, index) => {
                                return (
                                    <div key={ index } 
                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img src={ PUBLIC_URL + item } alt='' />
                                    </div>
                                );
                            })
                        }
                    </Carousel>
                </div>
                <div className='content'>
                    <div className='price'>
                        <i>￥</i>
                        <span>{ basicInfo.price ? Number(basicInfo.price).toFixed(2) : 0 }</span>
                    </div>
                    <div className='product_info'>
                        <p>{ basicInfo.description ? basicInfo.description : '敬请期待~~~' }</p>
                        <span>{ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }</span>
                    </div>
                    <div className='num'>
                        <span>购买数量</span>
                        <Stepper
                            max={ 99 }
                            min={ 1 }
                            value={ num }
                            onChange={ watchNumber }
                        />
                    </div>
                    <List className='product_spec'>
                        <List.Item extra={ basicInfo.spec ? basicInfo.spec : '无' } arrow="horizontal" onClick={ this.showActionSheet.bind(this, specs, basicInfo.spec ? basicInfo.spec : '无') }>已选规格</List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default CommoditySpecification;