import React from 'react';
import { Grid } from 'antd-mobile';
import { observer } from "mobx-react";
// 静态数据
import { gridList } from './data';
// less样式
import './index.less';

// 宫格列表
@observer
class Index extends React.Component {
    render() {
        return (
            <div className='dm_GridList'>
                <Grid data={ gridList } activeStyle={ false } 
                    columnNum={ 5 }
                    hasLine={ false }
                    renderItem={ item => (
                        <div className='dm_GridList_content'>
                            <div className='brand'>
                                <img src={ item.icon } style={{ width: item.width || '52%' }} alt="brand" />
                            </div>
                            <div className='title'>{ item.text }</div>
                        </div>
                    )}
                    onClick={ (el) => this.props.history.replace({
                        pathname: '/views/products',
                        state: {
                            brandId: el.key
                        }
                    }) }
                />
            </div>
        );
    }
}

export default Index;