import React from 'react';
import { observer } from 'mobx-react';
import { ListView, Icon, SwipeAction } from 'antd-mobile';
import { toJS } from 'mobx';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { NavBar } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if( isIPhone ) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
// -------------------------------------------- 我的收藏 ---------------------------------------- //
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource
        };
    }

    async componentDidMount() {        
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
        await state.cartLisData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData )
            });
        }, 600);
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
        state.clearMobxData();
    }

    render() {
        let { dataSource=[], checkedObj={}, address } = state;
        checkedObj = toJS(checkedObj);

        const separator = (sectionID, rowID) => {
            return (
                <div
                    key={`${sectionID}-${rowID}`}
                    className='dm_cart_ListView_row_content_line'
                />
            );
        };

        let index = dataSource.length - 1;
        const row = (rowData, sectionID, rowID) => {    
            if( index < 0 ){
                return null;
            } 
            const obj = dataSource[index];
            --index;
            return (
                <SwipeAction
                    key={ obj.id }
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                        {
                            text: '加入购物车',
                            onPress: () => {
                                state.addcolsData([obj.id]);
                            },
                            style: { background: `linear-gradient(to right, #1890ff, #47a7ff)`, color: 'white' }
                        },
                        {
                            text: '删除',
                            onPress: () => {
                                state.delcartData([obj.id]);
                            },
                            style: { backgroundColor: '#1890FF', color: 'white' }
                        }
                    ]}
                >
                    <div className='dm_cart_ListView_row_content'
                        onClick={ () => this.props.history.push(`/views/products/detail/${obj.pid}`) }
                    >
                        <img src={ PUBLIC_URL + obj.mainPicture } alt='pImg' />
                        <div className='content'>
                            <div className='description'>{ obj.description }</div>
                            <div className='spec_list'>
                                <span>{ obj.spec }</span>
                            </div>
                            <div className='price_number'>
                                <div className='price'>¥<span>{ obj.price ? Number(obj.price).toFixed(2) : 0 }</span></div>
                                <div className='p_number'></div>
                            </div>
                        </div>
                    </div>
                </SwipeAction>
            );
        };
        return (
            <div className='dm_MyCollection'>
                <NavBar {...this.props} title='我的收藏' />
                <ListView
                    ref={ el => this.lv = el }
                    dataSource={ this.state.dataSource }
                    renderRow={ row }
                    initialListSize={ dataSource.length }
                    renderSeparator={ separator }
                    className="dm_cart_ListView"
                    useBodyScroll
                    scrollRenderAheadDistance={ 500 }
                />
            </div>
        );
    }
}

export default Index;