import React from 'react';
import { observer } from 'mobx-react';
import { List } from 'antd-mobile';
// 全局公共组件
import { NavBar } from '@com';
// 样式
import './index.less';
// ------------------------------------------ 我的 ---------------------------------------//
@observer
class Index extends React.Component {

    componentDidMount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
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
        return (
            <div className='dm_UserCenter'>
                <NavBar {...this.props} title='用户中心' />
                <List>
                    <List.Item
                        arrow="horizontal"
                        onClick={ () => this.props.history.push('/views/user/info') }
                    >个人资料</List.Item>
                    <List.Item
                        arrow="horizontal"
                        onClick={ () => this.props.history.push('/views/user/pwd') }
                    >修改登录密码</List.Item>
                    <List.Item
                        arrow="horizontal"
                        onClick={ () => this.props.history.push('/views/user/address') }
                    >收货地址</List.Item>
                </List>
            </div>
        );
    }
}

export default Index;