import React from 'react';
import { observer } from 'mobx-react';
import { TextareaItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
// 全局公共组件
import { NavBar } from '@com';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的评价
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentWillMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    componentDidMount() {
        const { id } = this.props.location && this.props.location.state || {};
        try{
            if( id ){
                state.productsData({ id });
                this.setState({ id });
            }
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        }catch(err) {
            console.log(err);
        }
    }

    // 提交评价
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                state.addcommentsData({
                    pid: this.state.id,
                    ...values
                });
            }
        });
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
        const { products=[] } = state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='dm_MyEvaluation'>
                <NavBar {...this.props} title='发表评价' 
                    rightContent={ 
                        <span style={{ fontSize: '16px' }}
                            onClick={ this.handleSubmit }
                        >发布</span>
                    }
                />
                <div className='content'>
                    <div className='p_details'>
                        {
                            products.map(item => {
                                return (
                                    <div key={ item.id } className='dm_OrderDetails_content'>
                                        <img src={ PUBLIC_URL + item.mainPicture } alt='pImg' />
                                        <div className='content'>
                                            <div className='description'>{ item.description }</div>
                                            <div className='spec_list'>{ item.spec }</div>
                                            <div className='price'>
                                                ¥<span>{ item.price ? Number(item.price).toFixed(2) : 0 }</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <form>
                        <TextareaItem
                            {
                                ...getFieldProps('content', {
                                    rules:[{
                                        required: true,
                                        message: '必填'
                                    }]
                                })
                            }
                            placeholder='请输入评价'
                            rows={ 5 }
                            count={ 300 }
                            className='comment_content'
                        />
                        <div className='err_tip'>
                            {
                                getFieldError('content') ? getFieldError('content').join(',') : null
                            }
                        </div>                        
                    </form>
                    <WhiteSpace size="sm" />
                </div>
            </div>
        );
    }
}

export default createForm()(Index);