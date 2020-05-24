import React from 'react';
import { observer } from 'mobx-react';
// 设置
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';
// 详情
@observer
class Pictures extends React.Component {
    render() {
        const { detailsPic, params } = this.props;
        return (
            <div className='Products_Details'>
                {
                    detailsPic.map((item, index) => {
                        return (
                            <div style={{ textAlign: 'center' }} key={ index }>
                                <img src={ PUBLIC_URL + item } style={{ width: '100%', height: 'auto' }} /> 
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Pictures;