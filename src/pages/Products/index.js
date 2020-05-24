import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { ListView, Tag, List } from 'antd-mobile';
import { toJS } from 'mobx';
// 全局公共组件
import { Modal, NavBar } from '@com';
// 全局公共方法
import { session } from '@utils';
// 全局设置
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 杂货铺 ---------------------------------------//
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            open: false,
            chkObj: {}
        };
    }

    async componentDidMount() {
        try {
            this.props.setCancelText && this.props.setCancelText('筛选');
            this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            this.props.setOnCancel && this.props.setOnCancel(this.onOpenChange);
            const { state: ste } = this.props && this.props.location || {};
            state.setCheckedObj(ste);
            this.setState({
                chkObj: ste
            });
        } catch (error) {
            console.log(error);
        }
        await state.productsData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData ),
                isLoading: false
            });
        }, 600);
        state.filterData();
    }

    // 加载列表数据
    onEndReached = async (event) => {
        let { current, setCurrent } = state;
        if( this.state.isLoading ) {
            return;
        }

        this.setState({ isLoading: true });
        await setCurrent(++current);
        await state.productsData();
        setTimeout(() => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows( state.genData ),
                isLoading: false
            });
        }, 1000);
    }
    
    // 打开筛选抽屉
    onOpenChange = () => {
        const open = !this.state.open ;
        this.setState({ open });
    }

    // 筛选条件 - 模态框
    toggleModal = () => {
        let { checkedObj } = state;
        this.setState(({ open }) => {
            if( open ) {
                this.setState({ chkObj: toJS(checkedObj) });
            }
            return ({
                open: !open
            });
        });
    }

    // 选择筛选条件
    onChange = (_this, value, bol) => {
        let { chkObj } = this.state;
        if( bol ){
            chkObj[_this] = value;
        }else{
            if( chkObj ){
                delete chkObj[_this];
            }
        }
        this.setState({ chkObj });
    }

    // 筛选条件 - 按钮
    drawerBtn = async (_this) => {
        let { checkedObj, setCheckedObj, setProductList } = state;
        let { chkObj } = this.state;
        const open = !this.state.open ;
        if( _this == 'reset' ) {
            this.setState({ chkObj: {} });
            return;
        }
        if( _this == 'cancel' ){
            this.setState({ chkObj: toJS(checkedObj) });
        }else if( _this == 'confirm' ){
            await setProductList();
            await setCheckedObj(chkObj);
            await state.productsData();
        }
        this.setState({ open });
    }

    componentWillUnmount() {
        state.clearMobxData();
        try {
            this.props.setCancelText && this.props.setCancelText();
            this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            this.props.setOnCancel && this.props.setOnCancel();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { productList=[], filterList=[] } = state;
        const { open, chkObj={} } = this.state;
        // 查字典表
        const { BRAND_LIST } = session.getItem('tableDic');

        const separator = (sectionID, rowID) => {
            return (
                <div
                    key={`${sectionID}-${rowID}`}
                    className='dm_Products_ListView_row_content_line'
                />
            );
        };

        let index = productList.length - 1;
        const row = (rowData, sectionID, rowID) => {    
            if( index < 0 ){
                return null;
            } 
            const obj = productList[index];
            --index;
            return (
                <div key={ obj.id } className='dm_Products_ListView_row'
                    onClick={ () => this.props.history.push(`/views/products/detail/${obj.id}`) }
                >
                    <div className='dm_Products_ListView_row_content'>
                        <img src={ PUBLIC_URL + obj.mainPicture } alt='pImg' />
                        <div className='content'>
                            <div className='description'>{ obj.description }</div>
                            <div className='tag_list'>
                                { obj.screenSize && obj.screenSize != '其他' ? <Tag small>{ obj.screenSize }</Tag> : '' }
                                { obj.gpu && obj.gpu != '其他' ? <Tag small>{ obj.gpu.length > 16 ? obj.gpu.slice(0, 16) + '...' : obj.gpu }</Tag> : '' }
                                { obj.memory && obj.memory != '其他' ? <Tag small>{ obj.memory }</Tag> : '' }
                            </div>
                            <div className='price'>¥<span>{ obj.price ? Number(obj.price).toFixed(2) : 0 }</span></div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className='dm_Products' style={ open ? {
                height: 'calc(100vh - 3.67rem)',
                overflow: 'auto'
            } : {} }>
                <ListView
                    ref={ el => this.lv = el }
                    dataSource={ this.state.dataSource }
                    renderFooter={() => {
                        if( !this.state.isLoading && this.props.setIsShowFooter ) {
                            this.props.setIsShowFooter(true);
                        }else{
                            this.props.setIsShowFooter(false);
                        }
                        return (
                            <div style={{ textAlign: 'center' }}>
                                { this.state.isLoading ? '加载中...' : '加载完毕' }
                            </div>
                        );
                    }}
                    renderRow={ row }
                    renderSeparator={ separator }
                    className="dm_Products_ListView"
                    useBodyScroll
                    scrollRenderAheadDistance={ 500 }
                    onEndReached={ this.onEndReached }
                    onEndReachedThreshold={ 10 }
                />
                <Modal 
                    visible={ open }
                    className='dm_Products_modal'
                    navBar={
                        <NavBar {...this.props} 
                            title='商品筛选'
                            onLeftClick={ this.toggleModal }
                        />
                    }
                    footer={[
                        { text: '取消', onPress: this.drawerBtn.bind(this, 'cancel') },
                        { text: '确认', onPress: this.drawerBtn.bind(this, 'confirm') }
                    ]}
                    children={                        
                        <div className='dm_Products_modal_content'>
                            <List>
                                <List.Item className='title'>价格</List.Item>
                                <List.Item wrap multipleLine className='content'>
                                    {
                                        ["0-3999", "4000-4499", "4500-4999", "5000-5499", "5500-5999", "6000-6999", "7000以上"].map((item, index) => {
                                            return (
                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'price', item) }
                                                    selected={ item == chkObj['price'] }
                                                >{ item }</Tag>
                                            );
                                        })
                                    }
                                </List.Item>
                            </List>
                            {
                                filterList.map((f, i) => {
                                    return (
                                        <Fragment key={ i }>
                                            <List>
                                                <List.Item className='title'>品牌</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.brandId.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'brandId', item) }
                                                                    selected={ item == chkObj['brandId'] }
                                                                >{ BRAND_LIST ? BRAND_LIST[item] : item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='title'>屏幕尺寸</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.screenSize.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'screenSize', item) }
                                                                    selected={ item == chkObj['screenSize'] }
                                                                >{ item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='title'>处理器</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.cpu.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'cpu', item) }
                                                                    selected={ item == chkObj['cpu'] }
                                                                >{ item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='title'>内存容量</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.memory.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'memory', item) }
                                                                    selected={ item == chkObj['memory'] }
                                                                >{ item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='title'>硬盘容量</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.disk.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'disk', item) }
                                                                    selected={ item == chkObj['disk'] }
                                                                >{ item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='title'>系统</List.Item>
                                                <List.Item wrap multipleLine className='content'>
                                                    {
                                                        f.systems.map((item, index) => {
                                                            return (
                                                                <Tag key={ index } onChange={ this.onChange.bind(this, 'systems', item) }
                                                                    selected={ item == chkObj['systems'] }
                                                                >{ item }</Tag>
                                                            );
                                                        })
                                                    }
                                                </List.Item>
                                            </List>
                                            <List>
                                                <List.Item className='clear_filter' onClick={ this.drawerBtn.bind(this, 'reset') }>清除筛选条件</List.Item>
                                            </List>
                                        </Fragment>
                                    );
                                })
                            }
                        </div>
                    }
                />
            </div>
        );
    }
}

export default Index;