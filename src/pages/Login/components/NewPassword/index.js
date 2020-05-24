import React from 'react';
import { InputItem, Button } from 'antd-mobile';
import { observer } from 'mobx-react';
// 全局公共组件
import { NavBar } from '@com';
// less样式
import './index.less';

// 新密码
@observer
class Index extends React.Component {
    render() {
        const {
            form: { getFieldProps },
            handleTarget, errTip
        } = this.props;
        return (
            <div className='dm_NewPassword'>
                <NavBar {...this.props} title='修改密码' 
                    onLeftClick={ handleTarget }
                />
                <form className='main_content'>
                    <InputItem
                        {...getFieldProps('uPwd', {
                            rules: [{
                                required: true,
                                message: '密码，必填'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                    >新密码</InputItem>
                    <InputItem
                        {...getFieldProps('confirm', {
                            rules: [{
                                required: true,
                                message: '确认密码，必填'
                            }]
                        })}
                        placeholder="请输入"
                        clear
                    >确认密码</InputItem>
                    <div className='err_tip'>
                        { errTip.length ? errTip.join('、') : null }
                    </div>
                    <Button type="primary" className='login_btns' onClick={ handleTarget.bind(this, 'log') }>提交新密码</Button>
                    <div className='login_handle'>
                        <a onClick={ handleTarget }>直接登录</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default Index;