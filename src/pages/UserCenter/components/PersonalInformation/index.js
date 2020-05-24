import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
// 全局公共组件
import { NavBar } from '@com';
// 全局公共方法
import { session } from '@utils';
import Form from './components/form';
// 数据
import state from './state';
// less样式
import './index.less';

// 个人资料
@observer
class Index extends React.Component {

    componentDidMount() {
        state.selectUserInfoData();
        try{
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        }catch(err) {
            console.log(err);
        }
    }

    // 提交
    handleSubmit = async () => {
        let { avatar, delList, updateUserInfoData, form } = state;
        avatar = toJS(avatar);
        let formData = new FormData();
        let userInfo = {};
        
        await new Promise((resolve, reject) => {
            form.validateFields(['phone', 'gender', 'birthday', 'nickName'], (err, values) => {
                if (!err) {
                    values['birthday'] = moment(values['birthday']).format('YYYY-MM-DD');
                    values['gender'] = !isNaN(Number(values.gender.toString())) ? Number(values.gender.toString()) : 2;
                    userInfo = {...values};
                    resolve();
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
        });

        await new Promise((resolve, reject) => {
            if( !avatar.length ){
                state.setErrTip(['上传头像，必传项！']);
            }else{
                state.setErrTip();
                avatar.forEach((item, index) => {
                    if( item.file ){
                        formData.append('avatar', item.file);
                    }else if( item.url ){
                        let url = item.url.slice(item.url.indexOf('api/') + 4);
                        formData.append('avatar', url);
                    }
                });
                resolve();
            }
        });

        // 表单
        formData.append('userInfo', JSON.stringify(userInfo));
        // // 存储被删图片
        formData.append('delList', JSON.stringify(delList));
        formData.append('uname', session.getItem('uname'));
        updateUserInfoData(formData);
    }

    // 上传图片
    onFilesChange = (files, type, index) => {
        let { avatar, setDelList } = state;
        avatar = toJS(avatar);
        switch(type) {
            case 'add':
                state.setAvatar(files);
                break;
            case 'remove':
                if( avatar && avatar.length && avatar[0] && avatar[0].url && avatar[0].url.includes('api/') ){
                    let url = avatar[0].url.slice(avatar[0].url.indexOf('api/') + 4);;
                    setDelList([url]);
                }
                state.setAvatar();
                break;            
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
        const { setForm, personalInformation, setPersonalInformation, errTip, avatar } = state;
        return (
            <div className='dm_PersonalInformation'>
                <NavBar {...this.props} title='个人资料' 
                    rightContent={ 
                        <span style={{ fontSize: '16px' }}
                            onClick={ this.handleSubmit }
                        >保存</span>
                    }
                />
                <Form 
                    setForm={ setForm }
                    personalInformation={ toJS(personalInformation) }
                    setPersonalInformation={ setPersonalInformation }
                    errTip={ toJS(errTip) }
                    avatar={ toJS(avatar) }
                    onFilesChange={ this.onFilesChange }
                />
            </div>
        );
    }
}

export default Index;