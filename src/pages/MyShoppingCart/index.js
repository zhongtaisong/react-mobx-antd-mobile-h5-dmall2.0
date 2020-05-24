import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { ListView, InputItem, Checkbox, Icon, SwipeAction, Toast, Modal } from 'antd-mobile';
import { toJS } from 'mobx';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { ActionSheet } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
const maxNum = 99;
const minNum = 1;
// -------------------------------------------- 购物车 ---------------------------------------- //
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            checkedAll: false,
            checkedNum: 0,
            checkedPrice: 0,
            isFinished: false,
            type: null,
            currentObj: {}
        };
    }

    async componentDidMount() {
        const { type } = this.props && this.props.location && this.props.location.state || {};
        this.setState({
            type
        });
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsPaddingBottm && this.props.setIsPaddingBottm(false);
            if( type == 'temp' ){
                this.props.setIsShowTab && this.props.setIsShowTab(false);
            }else{
                this.props.setIsShowTab && this.props.setIsShowTab(true);
            }
        } catch (error) {
            console.log(error);
        }
        await state.cartLisData();
        state.addressData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData )
            });
        }, 600);
    }

    // 获取活动面板 - 按钮索引
    getBtnsIndex = (index) => {
        const { currentObj } = this.state;
        const { specList=[] } = state;
        if( specList.length != index ){
            state.updateSpecData({
                id: currentObj.id, 
                pid: specList[index] ? specList[index].id : '', 
                num: currentObj.num, 
                price: specList[index] ? specList[index].price : 0
            });
        }
    }
    
    // 选择规格 - 活动面板
    showActionSheet = async (obj = {}, e) => {
        e.stopPropagation();
        this.setState({
            currentObj: obj
        });
        const { pid, spec } = obj;        
        const data = await state.selectSpecData({ pid });
        let BUTTONS = data.map(item => item.spec);
        BUTTONS.push('关闭');

        let i = BUTTONS.indexOf(spec);
        let activeIndex = i > -1 ? i : 0;  

        ActionSheet({ 
            props: this.props, 
            btns: BUTTONS, 
            className: 'MyShoppingCart_sheet', 
            params: {}, 
            getBtnsIndex: this.getBtnsIndex, 
            activeIndex
        });
    }

    // 全选
    selectedAll = (e) => {
        let { checkedObj={}, setCheckedObj, dataSource=[] } = state;
        checkedObj = toJS(checkedObj);
        for(let c in checkedObj){
            checkedObj[c] = e.target.checked;
        }
        setCheckedObj( checkedObj );
        if( e.target.checked ){
            const sum = dataSource.reduce((total, curent, index, arr) => {
                return total + curent.num;
            }, 0);
            const checkedPrice = dataSource.reduce((total, curent, index, arr) => {
                return total + curent.price * curent.num;
            }, 0);
            this.setState({
                checkedNum: sum,
                checkedPrice
            });
        }else{
            this.setState({
                checkedNum: 0,
                checkedPrice: 0
            });
        }
        this.setState({
            checkedAll: e.target.checked
        });
    }

    // 被选中
    selectedCurrent = (id, e) => {
        let { checkedObj={}, setCheckedObj02, dataSource=[] } = state;
        setCheckedObj02(id, e.target.checked);
        let numArr = [];
        let totalArr = [];
        dataSource.map(item => {
            for(let c in checkedObj) {                
                if( checkedObj[c] && item.id == c ){
                    numArr.push(item.num);
                    totalArr.push(item.num * item.price);
                }
            }
        });
        const sum = numArr.reduce((total, curent, index, arr) => {
            return total + curent;
        }, 0);
        const checkedPrice = totalArr.reduce((total, curent, index, arr) => {
            return total + curent;
        }, 0);
        this.setState({
            checkedNum: sum,
            checkedPrice
        });
        for(let c in checkedObj){
            if( !checkedObj[c] ){
                this.setState({
                    checkedAll: false
                });
                return;
            }
        }
        this.setState({
            checkedAll: true
        });
    }

    // 加减商品数量
    changeNumber = async (_this, obj={}, evt) => { 
        evt.stopPropagation();
        let { id, price, num } = obj;
        let e = { target: {
            checked: true
        } };
        let totalprice = 0;
        if( _this == 'plus' ){
            if( num >= maxNum ){
                num = maxNum;
                return;
            }else{
                ++num;
            }
        }else if( _this == 'minus' ) {
            if( num <= minNum ){
                num = minNum;
                return;
            }else{
                --num;
            }
        }
        totalprice = num * price;
        await state.updatecartData(id, num, totalprice);
        await this.selectedCurrent(id, e);
    }

    // 手动输入商品数量
    handleNumber = (obj={}, value) => {        
        let { id, price } = obj;
        let v = value || 0;
        let totalprice = 0;
        if( v >= maxNum ){
            v = maxNum;
        }else if( value <= minNum ){
            v = minNum;
        }
        totalprice = v * price;
        state.updatecartData(id, v, totalprice);
    }

    // 管理
    handlebtn = () => {
        this.setState({
            isFinished: !this.state.isFinished
        });
    }

    // 加入收藏 / 删除
    handleButton = (_this) => {
        let { checkedObj={} } = state;
        let ids = [];

        for(let c in checkedObj){
            if( checkedObj[c] ){
                ids.push(c);
            }
        }

        if( _this == 'del' ){
            if( !ids.length ) {
                Toast.info('请选择要删除的商品', 0.5);
                return;
            }
            Modal.alert('删除', `确定要删除已选中的${ids.length}件商品`, [
                { text: '取消', onPress: () => {
                    return;
                } },
                { text: '确定', onPress: () => {
                    state.delcartData( ids );                    
                    this.setState({
                        checkedNum: 0,
                        checkedPrice: 0
                    });
                    return;
                } }
            ]);
        }else if( _this == 'col' ){
            if( !ids.length ) {
                Toast.info('请选择要加入收藏的商品', 0.5);
                return;
            }
            Modal.alert('加入收藏', `确定要将已选中的${ids.length}件商品加入收藏`, [
                { text: '取消', onPress: () => {
                    return;
                } },
                { text: '确定', onPress: () => {
                    state.addcolsData( ids );                    
                    this.setState({
                        checkedNum: 0,
                        checkedPrice: 0
                    });
                    return;
                } }
            ]);
        }
    }

    // 结算
    handleGoPay = () => {
        let { checkedObj={}, dataSource=[] } = state;
        let ids = [];

        dataSource.map(item => {
            for(let c in checkedObj){
                if( checkedObj[c] && item.id == c ){
                    ids.push(Number(item.pid));
                }
            }
        });

        if( ids.length ){
            this.props.history.push({
                pathname: '/views/products/cart/settlement',
                state: {
                    id: ids,
                    type: 'cart'
                }
            });
        }else{
            window.Toast('info', '请选择需要结算的商品！', 0.5);
        }
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
            this.props.setIsPaddingBottm && this.props.setIsPaddingBottm();
        } catch (error) {
            console.log(error);
        }
        state.clearMobxData();
    }

    render() {
        let { dataSource=[], checkedObj={}, address } = state;
        const { checkedAll, isFinished, type } = this.state;
        checkedObj = toJS(checkedObj);

        const separator = (sectionID, rowID) => {
            return (
                <div
                    key={`${sectionID}-${rowID}`}
                    className='dm_cart_ListView_row_content_line'
                />
            );
        };

        let index = dataSource.length - 1;
        const row = (rowData, sectionID, rowID) => {    
            if( index < 0 ){
                return null;
            } 
            const obj = dataSource[index];
            --index;
            return (
                <SwipeAction
                    key={ obj.id }
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                        {
                            text: '加入收藏',
                            onPress: () => {
                                state.addcolsData([obj.id]);
                            },
                            style: { background: '#1890ff', color: 'white' }
                        },
                        {
                            text: '删除',
                            onPress: () => {
                                state.delcartData([obj.id]);
                            },
                            style: { backgroundColor: '#0e80d2', color: 'white' }
                        }
                    ]}
                >
                    <Checkbox.CheckboxItem className='dm_cart_ListView_row' checked={ checkedObj[obj.id] || false }
                        onChange={ this.selectedCurrent.bind(this, obj.id) }
                    >
                        <div className='dm_cart_ListView_row_content'
                            onClick={ () => this.props.history.push(`/views/products/detail/${obj.pid}`) }
                        >
                            <img src={ PUBLIC_URL + obj.mainPicture } alt='pImg' />
                            <div className='content'>
                                <div className='description'>{ obj.description }</div>
                                <div className='spec_list' onClick={ this.showActionSheet.bind(this, toJS(obj)) }>
                                    <span>{ obj.spec }</span>
                                    <Icon type='down' />
                                </div>
                                <div className='price_number'>
                                    <div className='price'>¥<span>{ obj.price ? Number(obj.price).toFixed(2) : 0 }</span></div>
                                    <div className='p_number'>
                                        <span className='nbr minus' onClick={ this.changeNumber.bind(this, 'minus', obj) }>-</span>
                                        <InputItem type='number' value={ obj.num } onClick={ (e) => e.stopPropagation() } onChange={ this.handleNumber.bind(this, obj) } />
                                        <span className='nbr plus' onClick={ this.changeNumber.bind(this, 'plus', obj) }>+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Checkbox.CheckboxItem>
                </SwipeAction>
            );
        };
        return (
            <div className='dm_cart'>
                <div className='dm_cart_header'>
                    <div className='top'>
                        <h1>
                            {
                                type == 'temp' ? (
                                    <Icon type='left' 
                                        color='#1890FF'
                                        onClick={ () => this.props.history.goBack() }
                                    />
                                ) : ''
                            }
                            购物车
                        </h1>
                        {
                            dataSource.length ? (
                                <span onClick={ this.handlebtn }>{
                                    !isFinished ? '管理' : '完成'
                                }</span>
                            ) : ''
                        }
                    </div>
                    <div className='bottom'>
                        <span className='ellipsis'>共 { dataSource.length } 件宝贝</span>
                        <span className='ellipsis'>收货地址：{ address || '暂无默认地址' }</span>
                    </div>
                </div>
                {
                    dataSource.length ? (
                        <Fragment>
                            <ListView
                                ref={ el => this.lv = el }
                                dataSource={ this.state.dataSource }
                                renderRow={ row }
                                initialListSize={ dataSource.length }
                                renderSeparator={ separator }
                                className="dm_cart_ListView"
                                useBodyScroll
                                scrollRenderAheadDistance={ 500 }
                            />
                            <div className='dm_cart_footer' style={{ bottom: type != 'temp' ? '50px' : 0 }}>
                                <Checkbox.AgreeItem className='left' onChange={ this.selectedAll } checked={ checkedAll }>全选</Checkbox.AgreeItem>
                                <div className={ `right${ isFinished ? ' right_manage' : '' }` }>
                                    {
                                        !isFinished ? (
                                            <Fragment>
                                                <span className='ellipsis'>合计：<i>￥{ this.state.checkedPrice.toFixed(2) }</i></span>
                                                <i onClick={ this.handleGoPay }>结算 ({ this.state.checkedNum })</i>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <i onClick={ this.handleButton.bind(this, 'col') }>加入收藏</i>
                                                <i onClick={ this.handleButton.bind(this, 'del') }>删除</i>
                                            </Fragment>                                
                                        )
                                    }
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <div className='empty_cart'>
                            <img src={ require('@img/svg/empty_cart.svg')} alt='empty_cart' />
                            购物车是空的
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Index;