import React, { Fragment } from 'react';
import { Comment, Avatar, Empty, Icon, Button, Input, message, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共方法
import { session } from '@utils';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';
const { TextArea  } = Input;

// 留言
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            action: null,
            submitting: false,
            value: null
        };
    }

    componentDidMount() {
        state.selmessagesData();
    }

    // 喜欢 / 不喜欢
    handleLike = (type, index, item={} ) => {
        let { nums, setNums02 } = state;
        const { id } = item;
        nums = toJS(nums);

        this.setState({
            [`action${index}`]: type
        });
        let result = nums[index][type] == item[type] ? nums[index][type]+1 : nums[index][type];
        setNums02(index, type, result);
        if( type == 'agree' ){
            setNums02(index, 'disagree', item['disagree']);
        }else{
            setNums02(index, 'agree', item['agree']);
        }
        nums[index][type] == item[type] && state.agreemessagesData({
            id, type, 
            agreeNum: type == 'agree' ? result : item['agree'],
            disagreeNum: type == 'agree' ? item['disagree'] : result
        });
    }

    // 发表留言
    handleSubmit = () => {
        const { oauthCode } = $state;
        if( oauthCode && oauthCode == 401 ){
            message.error('请先登录，再发表留言，谢谢！');
            return;
        }

        if( !this.state.value ){
            message.error('留言内容不能为空！');
            return;
        }
        this.setState({
            submitting: true,
        });
        setTimeout(() => {
            state.addMessagesData({
                uname: session.getItem('uname'),
                content: this.state.value
            });
            this.setState({
                submitting: false,
                value: null
            });
        }, 1000);
    };
    
    // 留言内容
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        const { messageList, nums } = state;
        const { submitting, value } = this.state;
        const { oauthCode } = $state;
        return (
            <div className='common_width dm_Message'>
                <Comment
                    content={
                        <Row>
                            <Col span={ 24 }>
                                <TextArea rows={ 4 } onChange={ this.handleChange } value={ value } maxLength={ 300 } />
                            </Col>
                            <Col span={ 24 } className='submit'>
                                <Button htmlType="submit" loading={ submitting } onClick={ this.handleSubmit } type="primary">发表留言</Button>
                            </Col>
                        </Row>
                    }
                    className='submit_comment'
                />
                {
                    messageList.length ? (
                        <Fragment>
                            {
                                messageList.map((item, index) => {
                                    return (
                                        <Comment
                                            key={ item.id }
                                            actions={ oauthCode && oauthCode != 401 ? [
                                                <span key="comment-basic-agree">
                                                    <Icon
                                                        type="like"
                                                        theme={ this.state[`action${index}`] === 'agree' ? 'filled' : 'outlined' }
                                                        onClick={ this.handleLike.bind(this, 'agree', index, item) }
                                                    />
                                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ nums[index] && nums[index]['agree'] ? nums[index]['agree'] : 0 }</span>
                                                </span>,
                                                <span key="comment-basic-disagree">
                                                    <Icon
                                                        type="dislike"
                                                        theme={ this.state[`action${index}`] === 'disagree' ? 'filled' : 'outlined'}
                                                        onClick={ this.handleLike.bind(this, 'disagree', index, item) }
                                                    />
                                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ nums[index] && nums[index]['disagree'] ? nums[index]['disagree'] : 0 }</span>
                                                </span>
                                            ] : [] }
                                            author={ item.uname }
                                            avatar={ <Avatar src={ item.avatar ? PUBLIC_URL + item.avatar : '' } alt="avatar" /> }
                                            content={
                                                <p style={{ fontSize: '14px' }}>{ item.content }</p>
                                            }
                                            datetime={ item.submitTime }
                                        />
                                    );
                                })
                            }
                        </Fragment>
                    ) : (
                        <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='暂无留言' />
                    )
                }
            </div>
        );
    }
}

export default Index;