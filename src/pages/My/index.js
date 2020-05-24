import React from 'react';
import { observer } from 'mobx-react';
import { List } from 'antd-mobile';
// 全局设置
import { PUBLIC_URL } from '@config';
// 静态数据
import { listInfo } from './data';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// 样式
import './index.less';
// ------------------------------------------ 我的 ---------------------------------------//
@observer
class Index extends React.Component {

    componentDidMount() {
        state.selectUserInfoData();
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsPaddingBottm && this.props.setIsPaddingBottm(false);
        } catch (error) {
            console.log(error);
        }
    }

    // 跳转到目标页面
    intoTargetPage = (that) => {
        const { oauthCode, admin } = $state;
        if( that == 'login' ){
            this.props.history.push('/login');
        }else if( that == 'register' ){
            this.props.history.push('/register');
        }else if( that == 'logout' ){
            state.logoutData();
        }else{
            if( oauthCode && oauthCode != 401 ){
                if( that == 'admin' ){
                    if( admin == 1 ){
                        this.props.history.push(`/views/${that}`);
                    }else{
                        window.Toast('fail', '您不是管理员，无权进入后台！');
                    }
                }else{
                    this.props.history.push(`/views/${that}`);
                }
            }else{
                window.Toast('fail', '尚未登录，无法访问该页面！点击logo跳转首页');
                this.props.history.replace('/login');
            }
        }
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsPaddingBottm && this.props.setIsPaddingBottm();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { unameInfo={} } = state;
        const { uname, admin } = $state;
        return (
            <div className='dm_My'>
                <div className='avatar_info'>
                    <div className='avatar'>
                        <img src={ unameInfo.avatar ? PUBLIC_URL + unameInfo.avatar : require('@img/logo.png') } alt='avatar' />
                    </div>
                    <span>{ unameInfo.nickName }</span>
                </div>
                <div className='dm_My_main_content'>
                    <List>
                        {
                            listInfo.length && listInfo.map(item => {
                                return (
                                    <List.Item
                                        key={ item.key }
                                        thumb={ item.icon }
                                        arrow="horizontal"
                                        onClick={ () => this.props.history.push( item.path ) }
                                    >{ item.title }</List.Item>
                                );
                            })
                        }
                        {/* {
                            admin == 1 ? (
                                <List.Item
                                    thumb={ require('@img/svg/admin.svg') }
                                    onClick={ this.intoTargetPage.bind(this, 'admin') }
                                    arrow="horizontal"
                                >商城后台</List.Item>
                            ) : ''
                        } */}
                        <List.Item
                            thumb={ require('@img/svg/logout.svg') }
                            onClick={ this.intoTargetPage.bind(this, 'logout') }
                            arrow="horizontal"
                        >退出登录</List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default Index;