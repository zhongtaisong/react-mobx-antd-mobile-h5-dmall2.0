import React, { Fragment } from 'react';
import { List, Icon } from 'antd-mobile';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { Modal, NavBar } from '@com';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 商品评价
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            action: null,
            open: false
        };
    }

    componentDidMount() {
        this.props.pid && state.selcommentsData({
            pid: this.props.pid
        });
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.pid != nextProps.pid ){
            this.props.pid && nextProps.pid && state.selcommentsData({
                pid: nextProps.pid
            });
        }
    }

    // 喜欢 / 不喜欢
    handleLike = (type, index, item={} ) => {
        let { nums, setNums02 } = state;
        const { id } = item;
        nums = toJS(nums);

        this.setState({
            [`action${index}`]: type
        });
        let result = nums[index][type] == item[type] ? nums[index][type]+1 : nums[index][type];
        setNums02(index, type, result);
        if( type == 'agree' ){
            setNums02(index, 'disagree', item['disagree']);
        }else{
            setNums02(index, 'agree', item['agree']);
        }
        nums[index][type] == item[type] && state.agreecommentsData({
            id, type, 
            agreeNum: type == 'agree' ? result : item['agree'],
            disagreeNum: type == 'agree' ? item['disagree'] : result
        });
    }

    // 商品评价 - 模态框
    toggleModal = () => {
        this.setState(({ open }) => ({
            open: !open
        }));
    }

    render() {
        const { commentList, nums } = state;
        const { oauthCode } = $state;
        const { open } = this.state;
        return (
            <div className='ProductsDetail_Comment'>
                <List className='comment_list'>
                    <List.Item extra={ `共 ${commentList.length} 条` } arrow="horizontal" 
                        onClick={ commentList.length ? this.toggleModal : null }
                    >评价</List.Item>
                    {
                        commentList.length ? (
                            <Fragment>                                
                                {
                                    commentList.slice(0, 2).map((item, index) => {
                                        return (
                                            <List.Item key={ index } 
                                                align="top" 
                                                multipleLine
                                            >
                                                <div className='top'>
                                                    <div>
                                                        <img src={ item.avatar ? PUBLIC_URL + item.avatar : '' } alt='avatar' />
                                                        { item.uname }
                                                    </div>
                                                    <span>{ item.commentTime }</span>
                                                </div>
                                                <div className='bottom'>{ item.content }</div>
                                            </List.Item>
                                        );
                                    })
                                }
                                {
                                    commentList.length > 2 ? (
                                        <List.Item className='all_comment' 
                                            onClick={ this.toggleModal }
                                        >
                                            查看全部评价
                                            <Icon type='right' />
                                        </List.Item>
                                    ) : ''
                                }
                            </Fragment>
                        ) : (
                            <List.Item className='no_comment'>暂无评价</List.Item>
                        )
                    }
                </List>
                <Modal 
                    visible={ open }
                    className='dm_Products_modal'
                    navBar={
                        <NavBar {...this.props} 
                            title='商品评价'
                            onLeftClick={ this.toggleModal }
                        />
                    }
                    children={                        
                        <List className='comment_list'>
                            {
                                commentList.map((item, index) => {
                                    return (
                                        <List.Item key={ index } 
                                            align="top" 
                                            multipleLine
                                        >
                                            <div className='top'>
                                                <div>
                                                    <img src={ item.avatar ? PUBLIC_URL + item.avatar : '' } alt='avatar' />
                                                    { item.uname }
                                                </div>
                                                <span>{ item.commentTime }</span>
                                            </div>
                                            <div className='bottom'>{ item.content }</div>
                                        </List.Item>
                                    );
                                })
                            }
                        </List>
                    }
                />
            </div>
        );
    }
}

export default Index;