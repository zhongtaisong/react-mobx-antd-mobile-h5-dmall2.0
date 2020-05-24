import React from 'react';
import { observer } from 'mobx-react';
import { List } from 'antd-mobile';
import { toJS } from 'mobx';
// 全局公共方法
import { session } from '@utils';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { NavBar, Modal } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 结算页
@observer
class SettlementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: [],
            visible: false
        };
    }

    componentDidMount() {
        const { state: ste } = this.props.location;
        if( ste && ste.id && ste.type ){
            state.settlementData(ste.id, ste.type, ste.num);
            this.setState({
                pid: ste.id
            });
        }
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
    }

    // 提交订单
    handleSubmitOrders = async () => {
        let { selectAddress, num, totalprice, nums } = state;
        const orderId = await state.addorderData({
            uname: session.getItem('uname'), 
            pid: this.state.pid, 
            aid: selectAddress.id,
            num,
            totalprice,
            nums
        });
        if( orderId ){
            this.props.history.replace({
                pathname: '/views/products/cart/orderDetails',
                state: {
                    id: orderId
                }
            });
        }else{
            window.Toast('fail', '订单主键orderId不能为空！');
        }
    }

    // 切换模态框
    toggleModal = () => {
        this.setState(({ visible }) => ({
            visible: !visible
        }));
    }

    componentWillUnmount() {
        state.clearMobxData();
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let { dataSource02, selectAddress, dataSource01, setSelectAddress, num, totalprice } = state;
        const { name, region, detail, phone } = selectAddress || {};
        const { visible } = this.state;
        selectAddress = toJS(selectAddress) || {};
        return (
            <div className='dm_SettlementPage'>
                <NavBar {...this.props} title='结算页' />
                <div className='address'>
                    <List>
                        <List.Item arrow="horizontal" multipleLine 
                            activeStyle={{ background: '#f0f0f0' }}
                            onClick={ this.toggleModal }
                        >
                            <div className='address_info'>
                                <span>{ selectAddress.name }</span>
                                <span>{ selectAddress.phone ? selectAddress.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : selectAddress.phone }</span>
                            </div>
                            <List.Item.Brief>{ `${selectAddress.region} ${selectAddress.detail}` }</List.Item.Brief>
                        </List.Item>
                    </List>
                </div>
                <div className='p_details'>
                    {
                        dataSource02.length && dataSource02.map(item => {
                            return (
                                <div key={ item.id } className='dm_OrderDetails_content'>
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
                    <div>商品金额
                        <span><i>￥</i>{ totalprice ? Number(totalprice).toFixed(2) : 0 }</span>
                    </div>
                </div>
                <div className='bottom_tab_btns'>
                    <div>
                        <i>￥</i>
                        { totalprice ? Number(totalprice).toFixed(2) : 0 }
                    </div>
                    <span onClick={ this.handleSubmitOrders }>提交订单</span>
                </div>
                <Modal 
                    visible={ visible }
                    navBar={                        
                        <NavBar {...this.props} title='收货地址'
                            onLeftClick={ this.toggleModal }
                        />
                    }
                    children={                        
                        <div className='dm_SettlementPage_main_content' style={{ height: '100%', overflow: 'scroll' }}>
                            <List>
                                {
                                    dataSource01.map((item, index) => {
                                        return (
                                            <List.Item multipleLine key={ index }
                                                onClick={ () => {
                                                    state.setSelectAddress(item);
                                                    this.toggleModal();
                                                } }
                                            >
                                                <div className='address_info'>
                                                    <span>{ item.name }</span>
                                                    <span>{ item.phone ? item.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : item.phone }</span>
                                                </div>
                                                <List.Item.Brief>
                                                    {
                                                        item.isDefault == 1 ? (
                                                            <i>默认</i>
                                                        ) : ''
                                                    }
                                                    {`${ item.region }${ item.detail }`}
                                                </List.Item.Brief>
                                            </List.Item>
                                        );
                                    })
                                }
                            </List>
                        </div>
                    }
                />
            </div>
        );
    }
}

export default SettlementPage;