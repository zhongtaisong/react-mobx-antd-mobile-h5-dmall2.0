import React from 'react';
import { observer } from 'mobx-react';
import { InputItem, Button } from 'antd-mobile';
// 全局公共组件
import { NavBar } from '@com';
// less样式
import './index.less';

// 忘记密码
@observer
class Index extends React.Component {
    render() {
        const {
            form: { getFieldProps },
            handleTarget, errTip
        } = this.props;
        return (
            <div className='dm_ForgetPassword'>
                <NavBar {...this.props} title='忘记密码' 
                    onLeftClick={ handleTarget }
                />
                <form className='main_content'>
                    <InputItem
                        {...getFieldProps('email', {
                            rules: [{
                                required: true,
                                message: '邮箱'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                    >邮箱</InputItem>
                    <InputItem
                        {...getFieldProps('uName', {
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
                    >手机号码</InputItem>
                    <div className='err_tip'>
                        { errTip.length ? errTip.join('、')+'必填' : null }
                    </div>
                    <Button type="primary" className='login_btns' onClick={ handleTarget.bind(this, 'new') }>验证信息</Button>
                    <div className='login_handle'>
                        <a onClick={ handleTarget }>直接登录</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Index;