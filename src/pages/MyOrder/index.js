import React from 'react';
import { observer } from 'mobx-react';
import { ListView, Button } from 'antd-mobile';
// 全局公共组件
import { Modal, NavBar } from '@com';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 我的订单 ---------------------------------------//
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            visible: false
        };
    }

    async componentDidMount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
        await state.selOrdersData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData ),
                isLoading: false
            });
        }, 600);
    }

    // 加载列表数据
    onEndReached = async (event) => {
        let { current, setCurrent } = state;
        if( this.state.isLoading ) {
            return;
        }

        this.setState({ isLoading: true });
        await setCurrent(++current);
        await state.selOrdersData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData ),
                isLoading: false
            });
        }, 1000);
    }

    // 删除订单 / 评价
    handleOrderBtn = (_this, id) => {
        if( _this == 'comment' ){
            state.detailOrdersData({ id });
            this.setState({
                visible: true
            });
        }else if( _this == 'delete' ){
            window.Alert('删除', '您确定要删除该订单？', null, () => {
                state.deleteOrderData({ id });
                return;
            });
        }
    }

    // 评价中心 - 模态框
    toggleModal = () => {
        this.setState(({ visible }) => {
            return ({
                visible: !visible
            });
        });
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
        const { dataSource=[], dataSource02=[] } = state;
        const { visible } = this.state;
        const separator = (sectionID, rowID) => {
            return (
                <div
                    key={`${sectionID}-${rowID}`}
                    className='dm_MyOrder_ListView_row_content_line'
                />
            );
        };

        let index = dataSource.length - 1;
        const row = (rowData, sectionID, rowID) => {
            let totalprice = 0;
            let tNum = 0;
            if( index < 0 ){
                return null;
            } 
            const { content=[], ...obj } = dataSource[index] || {};
            --index;
            return (
                <div key={ obj.key } className='dm_MyOrder_ListView_row'>
                    <div onClick={() => this.props.history.push({
                        pathname:'/views/products/cart/orderDetails',
                        state: {
                            id: obj.id
                        }
                    })}>
                        {
                            content.length && content.map(item => {
                                totalprice += item.totalprice;
                                tNum += item.num;
                                return (
                                    <div key={ item.id } className='dm_MyOrder_ListView_row_content'>
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
                    <div className='bottom_btns'>
                        <div className='p_info'>
                            <span>共 { tNum } 件商品</span>
                            <div>
                                <span>合计：</span>
                                <span>￥</span>
                                <i>{ totalprice ? Number(totalprice).toFixed(2) : 0 }</i>
                            </div>
                        </div>
                        <div className='btns'>
                            <Button type='ghost' inline
                                onClick={ this.handleOrderBtn.bind(this, 'delete', obj.id) }
                            >删除订单</Button>
                            <Button type='primary' inline 
                                onClick={ this.handleOrderBtn.bind(this, 'comment', obj.id) }
                            >评价</Button>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='dm_MyOrder'>
                <NavBar {...this.props} title='我的订单' />
                <ListView
                    ref={ el => this.lv = el }
                    dataSource={ this.state.dataSource }
                    renderFooter={() => (<div style={{ textAlign: 'center' }}>
                        { this.state.isLoading ? '加载中...' : '加载完毕' }
                    </div>)}
                    renderRow={ row }
                    renderSeparator={ separator }
                    className="dm_MyOrder_ListView"
                    useBodyScroll
                    scrollRenderAheadDistance={ 500 }
                    onEndReached={ this.onEndReached }
                    onEndReachedThreshold={ 10 }
                />
                <Modal 
                    visible={ visible }
                    className='dm_MyOrder_modal'
                    navBar={
                        <NavBar {...this.props} title='评价中心' 
                            onLeftClick={ this.toggleModal }
                        />
                    }
                    children={                        
                        <div className='modal_main_content' style={{ height: '100%', overflow: 'scroll' }}>
                            <div className='p_details'>
                                {
                                    dataSource02.map(item => {
                                        return (
                                            <div key={ item.id } className='dm_OrderDetails_content'>
                                                <img src={ PUBLIC_URL + item.mainPicture } alt='pImg' />
                                                <div className='content'>
                                                    <div className='description'>{ item.description }</div>
                                                    <div className='spec_list'>{ item.spec }</div>
                                                    <div className='price_and_btn'>
                                                        <div className='price'>
                                                            ¥<span>{ item.price ? Number(item.price).toFixed(2) : 0 }</span>
                                                            <i>x{ item.num }</i>
                                                        </div>
                                                        <Button type='ghost' inline 
                                                            onClick={() => this.props.history.push({
                                                                pathname: '/views/products/cart/evaluate',
                                                                state: {
                                                                    id: item.id
                                                                }
                                                            }) }
                                                        >评价</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    }
                />
            </div>
        );
    }
}

export default Index;