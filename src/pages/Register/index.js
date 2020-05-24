import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
// 全局公共组件
import { NavBar } from '@com';
// 全局设置
import { indexState, PWD_KEY } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';
// 注册
@observer
class Index extends React.Component {

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
        indexState.oauthData();
    }

    // 提交注册信息
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { upwd, confirm } = values || {};
                if( upwd != confirm ) {                        
                    state.setErrTip(['密码和确认密码不一致！']);
                }else{
                    state.setErrTip();
                    values.upwd = this.$md5( values.upwd + PWD_KEY );
                    values.confirm = this.$md5( values.confirm + PWD_KEY );
                    state.registerData( values );
                }
            }else{
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
    };

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { errTip } = state;
        return (
            <div className='dm_Register'>
                <NavBar {...this.props} title='注册' 
                    onLeftClick={() => {
                        this.props.history.replace('/login');
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
                        placeholder="请输入"
                        clear
                    >用户名</InputItem>
                    <InputItem
                        {...getFieldProps('phone', {
                            rules: [{
                                required: true,
                                message: '手机号码'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                        type="phone"
                    >手机号码</InputItem>
                    <InputItem
                        {...getFieldProps('email', {
                            rules: [{
                                required: true,
                                message: '邮箱'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                        type='email'
                    >邮箱</InputItem>
                    <InputItem
                        {...getFieldProps('upwd', {
                            rules: [{
                                required: true,
                                message: '密码'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                        type="password"
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('confirm', {
                            rules: [{
                                required: true,
                                message: '确认密码'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                        type="password"
                    >确认密码</InputItem>
                    <div className='err_tip'>
                        { errTip.length ? errTip.join('、')+'必填' : null }
                    </div>
                    <Button type='primary' className='login_btns' onClick={ this.handleSubmit }>提交注册信息</Button>
                    <div className='login_handle'>
                        <Link to="/login">已有账号，直接登录</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default createForm()(Index);