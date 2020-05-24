import React from 'react';
import { observer } from 'mobx-react';
import { Grid, WhiteSpace } from 'antd-mobile';
// url前缀
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';

// 热门推荐
@observer
class Index extends React.Component {
    render() {
        const { hotList=[] } = this.props;
        return (
            <div className='dm_HotThisWeek'>
                <WhiteSpace size="md" />
                <div className='title'>
                    <img src={ require('@img/svg/hot.svg') } alt='hot' />
                    热门推荐
                </div>
                <Grid data={ hotList } activeStyle={ false } 
                    columnNum={ 2 }
                    isCarousel
                    renderItem={ item => (
                        <div className='dm_HotThisWeek_products' 
                            onClick={() => {
                                this.props.history.push(`/views/products/detail/${item.id}`);
                            }}
                        >
                                <img src={ PUBLIC_URL + item.mainPicture } alt='mainPicture' />
                                <div>
                                    <span>{ item.description }</span>
                                    <p style={{ color: '#1890ff' }}>{ item.price ? Number(item.price).toFixed(2) : 0 }</p>
                                </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default Index;