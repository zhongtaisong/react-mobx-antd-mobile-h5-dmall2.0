import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共组件
import { NavBar } from '@com';
// form表单
import Form from './components/form';
// 设置
import { PWD_KEY } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 个人资料
@observer
class Index extends React.Component {

    componentDidMount() {
        try{
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        }catch(err) {
            console.log(err);
        }
    }

    // 提交
    handleSubmit = () => {
        state.form.validateFields((err, values) => {
            if ( !err ) {
                state.setErrTip();
                if( values.newUpwd !== values.confirmNewUpwd ){
                    state.setErrTip(['两次输入的新密码不一致']);
                    return;
                }else{
                    values.oldUpwd = this.$md5(values.oldUpwd + PWD_KEY);
                    values.newUpwd = this.$md5(values.newUpwd + PWD_KEY);
                    delete values['confirmNewUpwd'];
                    state.updateUpwdData(values);
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
    }

    componentWillUnmount() {
        state.clearMobxData();
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { setForm, loginPassword, setLoginPassword01, errTip } = state;
        return (
            <div className='dm_LoginPassword'>
                <NavBar {...this.props} title='修改登录密码' 
                    rightContent={ 
                        <span style={{ fontSize: '16px' }}
                            onClick={ this.handleSubmit }
                        >保存</span>
                    }
                />
                <Form 
                    setForm={ setForm }
                    loginPassword={ toJS(loginPassword) }
                    setLoginPassword01={ setLoginPassword01 }
                    errTip={ toJS(errTip) }
                />
            </div>
        );
    }
}

export default Index;