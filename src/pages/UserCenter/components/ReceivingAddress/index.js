import React from 'react';
import { List, SwipeAction, Toast } from 'antd-mobile';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 添加收货地址
import AddressModal from './components/addressModal';
// 全局公共组件
import { NavBar, Modal } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 收货地址
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            id: null
        };
    }

    componentDidMount() {
        state.selAddressData();
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
    }

    // 保存
    handleOk = () => {
        state.form.validateFields( (err, values) => {
            if ( !err ) {
                state.setErrTip();
                values['isDefault'] = values.isDefault[0];
                values['id'] = this.state.id;
                state.editAddressData(values).then((code) => {
                    if( code == 200 ) {
                        this.toggleModal();
                    }
                });
            }else {                
                let errTip = [];
                for(let [key, value] of Object.entries(err)) {
                    const { errors } = value || {};
                    if(errors) {
                        const { message } = (errors && errors[0]) || {};
                        errTip.push(message);
                    }
                }
                state.setErrTip(errTip);
            }
        });
    }

    // 编辑
    editAddress = (item) => {
        if(item){
            this.toggleModal();
            item['isDefault'] = !isNaN(Number(item.isDefault)) ? [Number(item.isDefault)] : [0];
            state.setAddressModalData( item );
            this.setState({ 
                id: item.id
            });
        }
    }

    // 切换模态框
    toggleModal = () => {
        this.setState(({ visible }) => ({
            visible: !visible
        }));
        state.setAddressModalData();
        state.setErrTip();
        this.setState({ 
            id: null
        });
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
        state.clearMobxData();
    }

    render() {
        const { dataSource=[], setForm, addressModalData, setAddressModalData, errTip } = state;
        const { visible } = this.state;
        return (
            <div className='dm_ReceivingAddress'>
                <NavBar {...this.props} title='收货地址' 
                    rightContent={ 
                        <span style={{ fontSize: '16px' }}
                            onClick={ this.toggleModal }
                        >添加</span>
                    }
                />
                <List className='main_content'>
                    {
                        dataSource.map((item, index) => {
                            return (
                                <SwipeAction key={ item.id }
                                    style={{ backgroundColor: 'gray' }}
                                    autoClose
                                    right={[
                                        {
                                            text: '删除',
                                            onPress: () => state.delAddressData({
                                                id: item.id
                                            }),
                                            style: { backgroundColor: '#1890FF', color: 'white' }
                                        }
                                    ]}
                                >
                                    <List.Item multipleLine extra={
                                        <span onClick={ this.editAddress.bind(this, toJS(item)) }>编辑</span>
                                    }>
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
                                </SwipeAction>
                            );
                        })
                    }
                </List>
                <Modal 
                    visible={ visible }
                    navBar={                        
                        <NavBar {...this.props} title='添加收货地址'
                            onLeftClick={ this.toggleModal }
                            rightContent={ 
                                <span style={{ fontSize: '16px' }}
                                    onClick={ this.handleOk }
                                >保存</span>
                            }
                        />
                    }
                    children={                        
                        <div className='dm_ReceivingAddress_modal' style={{ height: '100%', overflow: 'scroll' }}>
                            <AddressModal 
                                setForm={ setForm }
                                addressModalData={ toJS( addressModalData ) }
                                setAddressModalData={ setAddressModalData }
                                errTip={ toJS(errTip) }
                            />
                        </div>
                    }
                />
            </div>
        );
    }
}

export default Index;