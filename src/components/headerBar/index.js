import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { SearchBar, Tag, Icon } from 'antd-mobile';
// 全局公共组件
import { Modal, NavBar } from '@com';
// 全局设置
import { PUBLIC_URL } from '@config';
// mobx数据
import state from './state';
// less样式
import './index.less';

// 顶部导航
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            visible: false
        };
    }

    // 监听输入关键字
    onChange= (value) => {
        this.setState({
            value
        });
    };

    // 搜索
    onCancel = (e) => {
        e.stopPropagation();
        if( this.props.onCancel ){
            this.props.onCancel();
        }
    }

    // 获取搜索关键字
    getSearchKws = async (value) => {
        if( !value.trim() ){
            window.Toast('info', '关键字不能为空！');
            return;
        }
        state.kwData( value.trim() );
    }

    // 打开搜索页面
    toggleModal = () => {
        this.setState(({ visible }) => {
            state.setSearchResultList();
            if(visible) {
                this.setState({
                    value: ''
                });
            }
            return ({
                visible: !visible
            });
        });
    }

    render() {
        const { isShowLogo, cancelText } = this.props;
        const { value, visible } = this.state;
        const { searchResultList=[], isShowNoResult } = state;
        return (
            <div className='dm_HeaderBar'>
                {
                    isShowLogo ? (
                        <div className='logo'>
                            <img src={ require('@img/logo.png') } alt='logo' />
                        </div>
                    ) : ''
                }
                <div className={ `search_bar${ !isShowLogo ? ' search_bar_two' : '' }` }
                    onClick={() => {
                        this.setState({
                            visible: true
                        });
                    }}
                >
                    <SearchBar
                        value={ value }
                        placeholder="搜索商品"
                        onChange={ this.onChange }
                        showCancelButton={ false }
                        disabled
                    />
                    <div className='right_content' onClick={ this.onCancel }>{ cancelText }</div>
                </div>
                <Modal 
                    visible={ visible }
                    navBar={
                        <NavBar {...this.props} 
                            title={
                                <SearchBar
                                    value={ value }
                                    placeholder="搜索商品"
                                    onCancel={ this.getSearchKws }
                                    onChange={this.onChange}
                                    cancelText='搜索'
                                    showCancelButton={ true }
                                    onSubmit={ this.getSearchKws }
                                    ref={ ref => ref && ref.focus && ref.focus() }
                                />
                            }
                            onLeftClick={ this.toggleModal }
                            className='dm_HeaderBar_navBar'
                        />
                    }
                    children={                        
                        <div className='modal_main_content' style={{ height: '100%', overflow: 'scroll' }}>
                            {
                                !isShowNoResult ? (
                                    <Fragment>
                                        {
                                            searchResultList.map(item => {
                                                let obj = item;
                                                return (
                                                    <div key={ obj.id } className='listView_row'
                                                        onClick={ () => this.props.history.push(`/views/products/detail/${obj.id}`) }
                                                    >
                                                        <div className='listView_row_content'>
                                                            <img src={ PUBLIC_URL + obj.mainPicture } alt='pImg' />
                                                            <div className='content'>
                                                                <div className='description'>{ obj.description }</div>
                                                                <div className='tag_list'>
                                                                    { obj.screenSize && obj.screenSize != '其他' ? <Tag small>{ obj.screenSize }</Tag> : '' }
                                                                    { obj.gpu && obj.gpu != '其他' ? <Tag small>{ obj.gpu.length > 16 ? obj.gpu.slice(0, 16) + '...' : obj.gpu }</Tag> : '' }
                                                                    { obj.memory && obj.memory != '其他' ? <Tag small>{ obj.memory }</Tag> : '' }
                                                                </div>
                                                                <div className='price'>¥<span>{ obj.price ? Number(obj.price).toFixed(2) : 0 }</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </Fragment>
                                ) : (
                                    <div className='no_result'>
                                        <div className='icon'>
                                            <Icon type="search" size='lg' />
                                        </div>
                                        <span>抱歉！暂无相关商品</span>
                                    </div>
                                )
                            }
                        </div>
                    }
                />
            </div>
        );
    }
}

export default Index;