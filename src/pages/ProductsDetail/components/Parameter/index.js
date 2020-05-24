import React from 'react';
import { observer } from 'mobx-react';
// 全局公共方法
import { session } from '@utils';
// less样式
import './index.less';
const { BRAND_LIST } = session.getItem('tableDic');

// 规格参数
@observer
class Parameter extends React.Component {

    state = {
        showParams: [
            { id: 1, label: '品牌', key: 'brandId', value: '' },
            { id: 2, label: '商品名称', key: 'productName', value: '' },
            { id: 3, label: '商品毛重', key: 'weight', value: '' },
            { id: 4, label: '商品产地', key: 'placeOfOrigin', value: '' },
            { id: 5, label: '系统', key: 'systems', value: '' },
            { id: 6, label: '处理器', key: 'cpu', value: '' },
            { id: 7, label: '厚度', key: 'thickness', value: '' },
            { id: 8, label: '硬盘容量', key: 'disk', value: '' },
            { id: 9, label: '待机时长', key: 'standbyTime', value: '' },
            { id: 10, label: '系列', key: 'series', value: '' },
            { id: 11, label: '裸机重量', key: 'bareWeight', value: '' },
            { id: 12, label: '屏幕尺寸', key: 'screenSize', value: '' },
            { id: 13, label: '显卡型号', key: 'gpu', value: '' },
            { id: 14, label: '特性', key: 'characteristic', value: '' },
            { id: 15, label: '内存容量', key: 'memory', value: '' },
            { id: 16, label: '显存容量', key: 'gpuCapacity', value: '' },
            { id: 17, label: '机身材质', key: 'bodyMaterial', value: '' }
        ]
    }

    initial = (props, state) => {
        const { params={} } = props;
        let { showParams } = state;
        for(let p in params){
            showParams.forEach((item, index) => {
                if( p == item.key ){
                    showParams[index]['value'] = params[p];
                }
            });
        }
    }

    componentDidMount() {
        this.initial(this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        this.initial(nextProps, this.state);
    }

    render() {
        const { showParams=[] } = this.state;
        let [ firstParams, ...restParams ] = showParams;
        firstParams['value'] = BRAND_LIST ? BRAND_LIST[ firstParams['value'] ] : '';
        return (
            <dl className='Parameter'>
                {
                    firstParams && firstParams.label && firstParams.value ? (
                        <dt title={ firstParams.value }>{ firstParams.label }：{ firstParams.value }</dt>
                    ) : ''
                }
                <dd>
                    {
                        restParams.map((item, index) => {
                            return (<span key={ item.id } title={ item.value }>{ item.label }：{ item.value }</span>);
                        })
                    }                    
                </dd>
            </dl>
        );
    }
}

export default Parameter;