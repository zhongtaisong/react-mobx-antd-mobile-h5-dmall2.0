import React from 'react';
import { observer } from 'mobx-react';
import { WhiteSpace, List  } from 'antd-mobile';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 订单详情
@observer
class Index extends React.Component {

    componentDidMount() {
        const { id } = this.props || {};
        id && state.detailOrdersData({ id });
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { 
            dataSource02=[], orderInfo: { ordernum='-', submitTime='-', num=0, totalprice=0 },
            consignees: { detail='-', name='-', phone='-', region='-' }
        } = state;
        return (
            <div className='dm_OrderDetails'>
                <div className='address'>
                    <List>
                        <List.Item
                            thumb={ require('@img/svg/address.svg') }
                            activeStyle={{ background: '#f0f0f0' }}
                            onClick={() => {}}
                        >
                            <div className='address_info'>
                                <span>{ name }</span>
                                <span>{ phone ? phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : phone }</span>
                            </div>
                            <List.Item.Brief>{ `${region} ${detail}` }</List.Item.Brief>
                        </List.Item>
                    </List>
                </div>
                <div className='p_details'>
                    {
                        dataSource02.length && dataSource02.map(item => {
                            return (
                                <div key={ item.id } className='dm_OrderDetails_content'
                                    onClick={ () => this.props.history.push(`/views/products/detail/${item.id}`) }
                                >
                                    <img src={ PUBLIC_URL + item.mainPicture } alt='pImg' />
                                    <div className='content'>
                                        <div className='description'>{ item.description }</div>
                                        <div className='spec_list'>{ item.spec }</div>
                                        <div className='price'>
                                            ¥<span>{ item.price ? Number(item.price).toFixed(2) : 0 }</span>
                                            <i>x{ item.num }</i>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='common_info pay_info'>
                    <div>商品总数：
                        <span>{ num } 件</span>
                    </div>
                    <div>商品总价：
                        <span><i>￥</i>{ totalprice ? Number(totalprice).toFixed(2) : 0 }</span>
                    </div>
                    <div className='common_info_special'>实付款：
                        <span><i>￥</i>{ totalprice ? Number(totalprice).toFixed(2) : 0 }</span>
                    </div>
                </div>
                <WhiteSpace />
                <div className='common_info order_info'>
                    <div>
                        <span>订单编号：</span>
                        <span>{ ordernum }</span>
                    </div>
                    <div>
                        <span>付款时间：</span>
                        <span>{ submitTime }</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;