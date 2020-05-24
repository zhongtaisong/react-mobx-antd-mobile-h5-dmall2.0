import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { InputItem, Button } from 'antd-mobile';
// 全局公共组件
import { NavBar } from '@com';
// less样式
import './index.less';

// 登录
@observer
class Index extends React.Component {

    render() {
        const {
            form: { getFieldProps },
            handleTarget, loginSubmit, errTip
        } = this.props;
        return (
            <div className='dm_Logins'>
                <NavBar {...this.props} title='登录' 
                    onLeftClick={() => {
                        this.props.history.replace('/views/home');
                    }}
                />
                <form className='main_content'>
                    <InputItem
                        {...getFieldProps('uname', {
                            rules: [{
                                required: true,
                                message: '用户名'
                            }]
                        })}
                        placeholder="用户名"
                        clear
                    />
                    <InputItem
                        {...getFieldProps('upwd', {
                            rules: [{
                                required: true,
                                message: '密码'
                            }]
                        })}
                        type="password"
                        placeholder="请输入密码"
                        clear
                    />
                    <div className='err_tip'>
                        { errTip.length ? errTip.join('、')+'必填' : null }
                    </div>
                    <Button type='primary' className='login_btns' onClick={ loginSubmit }>登录</Button>
                    <div className='login_handle'>
                        <a onClick={ handleTarget.bind(this, 'forget') }>忘记密码？</a>
                        <Link to="/register">新用户注册</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Index;