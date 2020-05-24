import React from 'react';
import { observer } from 'mobx-react';
import { createForm } from 'rc-form';
import { toJS } from 'mobx';
// 登录
import Logins from './components/Logins';
// 忘记密码
import ForgetPassword from './components/ForgetPassword';
// 新密码
import NewPassword from './components/NewPassword';
// 设置
import { indexState, PWD_KEY } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 登录、忘记密码、新密码
@observer
class Index extends React.Component {

    // code: 0表示登录组件，1忘记密码组件，2新密码组件
    constructor(props) {
        super(props);
        this.state = {
            code: 0
        };
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
        indexState.oauthData();
    }

    // 登录
    loginSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                state.setErrTip();
                values.upwd = this.$md5( values.upwd + PWD_KEY );
                // 0表示不记住密码， 1表示记住密码
                values.isRemember = values.isRemember && values.isRemember.length ? 1 : 0;
                state.loginData( values );
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

    // 跳转忘记密码组件
    handleTarget = (that) => {
        state.setErrTip();
        if( that === 'forget' ){
            this.setState({
                code: 1
            });
        }else if( that === 'new' ){
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    state.setErrTip();
                    values.uname = values.uName;
                    delete values.uName;
                    const code = await state.forgetPwdData( values );
                    if( code === 200 ){
                        this.setState({
                            code: 2
                        });
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
        }else if( that === 'log' ){
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    const { uPwd, confirm } = values || {};
                    if( uPwd != confirm ) {                        
                        state.setErrTip(['新密码和确认密码不一致！']);
                    }else{
                        state.setErrTip();
                        let newUpwd = this.$md5( values.confirm + PWD_KEY );
                        const code = await state.newPwdData({ newUpwd });
                        if( code === 200 ){
                            this.setState({
                                code: 0
                            });
                        }
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
        }else{
            this.setState({
                code: 0
            });
        }
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    render() {
        const { code } = this.state;
        const { errTip } = state;
        return (
            <div className='dm_Login'>
                <div className='content'>
                    {
                        code === 0 ? (
                            <Logins 
                                {...this.props}
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget }  
                                loginSubmit={ this.loginSubmit }
                                errTip={ toJS(errTip) }
                            />
                        ) : code === 1 ? (
                            <ForgetPassword 
                                {...this.props}
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget }
                                errTip={ toJS(errTip) }
                            />
                        ) : code === 2 ? (
                            <NewPassword 
                                {...this.props}
                                form={ this.props.form } 
                                handleTarget={ this.handleTarget } 
                                errTip={ toJS(errTip) }
                            />
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default createForm()(Index);