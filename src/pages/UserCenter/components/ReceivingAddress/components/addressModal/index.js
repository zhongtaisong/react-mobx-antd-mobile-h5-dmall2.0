import React from 'react';
import { InputItem, List, Picker } from 'antd-mobile';
import { createForm  } from 'rc-form';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils } from '@utils';

const onFieldsChange = (props, changedFields) => {
    props.setAddressModalData({...toJS( props.addressModalData ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.addressModalData ) ){
        return formUtils.mobxToForm({...toJS( props.addressModalData )});
    }
};

const isDefaultArr = [
    {
        label: '是',
        value: 1
    },
    {
        label: '否',
        value: 0
    }
];

// 添加收货地址
@observer
class Index extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm(this.props.form);
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { errTip=[] } = this.props;
        return (
            <form>
                <InputItem 
                    {...getFieldProps('name', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '收货人，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >收货人</InputItem>
                <InputItem 
                    {...getFieldProps('region', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '所在地区，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >所在地区</InputItem>
                <InputItem 
                    {...getFieldProps('detail', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '详情地址，必填' 
                        }]
                    })}
                    placeholder='请输入'
                >详情地址</InputItem>
                <InputItem 
                    {...getFieldProps('phone', {
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: '联系电话，必填' 
                        }]
                    })}
                    placeholder='请输入'
                    type='phone'
                >联系电话</InputItem>
                <Picker data={ isDefaultArr } cols={ 1 } 
                    {...getFieldProps('isDefault', {
                        rules: [{
                            required: true, 
                            message: '设为默认地址，必选' 
                        }]
                    })}
                >
                    <List.Item arrow="horizontal">设为默认地址</List.Item>
                </Picker>
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
})(Index);