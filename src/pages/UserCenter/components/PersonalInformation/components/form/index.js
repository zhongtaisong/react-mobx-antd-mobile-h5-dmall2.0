import React from 'react';
import { InputItem, Picker, List, DatePicker } from 'antd-mobile';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { createForm  } from 'rc-form';
// 全局公共方法
import { formUtils } from '@utils';
// 全局公共组件
import { ImagePicker } from '@com';

const onFieldsChange = (props, changedFields) => {
    props.setPersonalInformation({...toJS( props.personalInformation ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.personalInformation ) ){
        return formUtils.mobxToForm({...toJS( props.personalInformation )});
    }
};

const genderArr = [
    {
        label: '男',
        value: '0'
    },
    {
        label: '女',
        value: '1'
    },
    {
        label: '保密',
        value: '2'
    }
];

// 个人资料
@observer
class Index extends React.Component {

    static propsTypes = {
        setForm: PropTypes.func
    }

    componentWillMount() {
        const { form, setForm } = this.props;
        form && setForm && setForm(form);
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { errTip, avatar, onFilesChange } = this.props;
        return (
            <form>
                <List>
                    <List.Item
                        extra={
                            <ImagePicker 
                                files={ avatar }
                                num={ 1 }
                                onChange={ onFilesChange }
                            />
                        }
                    >头像</List.Item>
                    <InputItem 
                        {...getFieldProps('uname', {
                            rules: [{
                                required: false, 
                                message: '非必填' 
                            }]
                        })}
                        editable={ false }
                        placeholder='-'
                    >用户名</InputItem>
                    <InputItem 
                        {...getFieldProps('nickName', {
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: '昵称，必填' 
                            }]
                        })}
                        placeholder='请输入'
                    >昵称</InputItem>
                    <InputItem 
                        {...getFieldProps('phone', {
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: '手机号码，必填' 
                            }]
                        })}
                        type='phone'
                        placeholder='请输入'
                    >手机号码</InputItem>
                    <Picker data={ genderArr } cols={ 1 } 
                        {...getFieldProps('gender', {
                            rules: [{
                                required: true, 
                                message: '性别，必填' 
                            }]
                        })}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <DatePicker
                        {...getFieldProps('birthday', {
                            rules: [{
                                required: true, 
                                message: '生日，必填' 
                            }]
                        })}
                        mode='date'
                        title='选择日期'
                        extra="请选择"
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                    <div className='err_tip'>
                        { errTip.length ? errTip.join('、') : null }
                    </div>
                </List>
            </form>
        );
    }
}

export default createForm({ 
    onFieldsChange, 
    mapPropsToFields 
})(Index);