import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { observer } from 'mobx-react';

// 导航栏
@observer
class Index extends React.Component {

    // 导航左边点击回调
    onLeftClick = () => {
        try{
            if( this.props.onLeftClick ){
                this.props.onLeftClick();
            }else{
                this.props.history.goBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

    render() {
        const { mode, icon, title, rightContent } = this.props;
        return (
            <NavBar
                {...this.props}
                mode={ mode || 'light' }
                icon={ icon || <Icon type="left" /> }
                onLeftClick={ this.onLeftClick }
                rightContent={ rightContent || [] }
            >{ title || 'NavBar' }</NavBar>
        );
    }
}

export default Index;