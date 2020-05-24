import React from 'react';
import { InputItem } from 'antd-mobile';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { createForm  } from 'rc-form';
// 双向绑定
import { formUtils } from '@utils';

const onFieldsChange = (props, changedFields) => {
    props.setLoginPassword01({...toJS( props.loginPassword ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.loginPassword ) ){
        return formUtils.mobxToForm({...toJS( props.loginPassword )});
    }
};

// 登录密码
@observer
class LoginPassword extends React.Component {

    componentWillMount() {
        const { form, setForm } = this.props;
        form && setForm && setForm(form);
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { errTip=[] } = this.props;
        return (
            <form>
                <InputItem 
                    {...getFieldProps('oldUpwd', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '旧密码，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >旧密码</InputItem>
                <InputItem 
                    {...getFieldProps('newUpwd', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '新密码，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >新密码</InputItem>
                <InputItem 
                    {...getFieldProps('confirmNewUpwd', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '确认新密码，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >确认新密码</InputItem>
                <div className='err_tip'>
                    { errTip.length ? errTip.join('、') : null }
                </div>
            </form>
        );
    }
}

export default createForm({ 
    onFieldsChange, 
    mapPropsToFields 
})(LoginPassword);