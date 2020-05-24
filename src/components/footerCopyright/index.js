import React from 'react';
import { TabBar } from 'antd-mobile';
import { observer } from 'mobx-react';
// 静态数据
import { tabInfo } from './data';
// mobx数据
import state from './state';
// less样式
import './index.less';

// tab
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab'
        };
    }

    componentDidMount() {        
        state.productNumData(); 
    }

    // icon样式
    styleImage = (url) => {
        return (
            <div style={{
                width: '22px',
                height: '22px',
                background: `url(${url}) center center /  21px 21px no-repeat` 
            }} />
        );
    }

    render() {
        const { history={}, location={} } = this.props;
        const { productNum } = state;
        return (
            <div className='dm_FooterCopyright' >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {
                        tabInfo && tabInfo.map(item => {
                            return (
                                <TabBar.Item
                                    title={ item.title }
                                    key={ item.key }
                                    icon={ this.styleImage(item.icon) }
                                    selectedIcon={ this.styleImage(item.selectedIcon) }
                                    selected={ location.pathname === item.path }
                                    badge={ item.isBadge ? productNum : null }
                                    onPress={() => {
                                        history && history.push( item.path );
                                    }}
                                />
                            );
                        })
                    }
                </TabBar>
            </div>
        );
    }
}

export default Index;