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
                this.props.history && this.props.history.goBack && this.props.history.goBack();
            }
        }catch(err) {
            console.log(err);
        }
    }

    render() {
        const { mode, icon, title, rightContent, className } = this.props;
        return (
            <NavBar
                {...this.props}
                mode={ mode || 'light' }
                icon={ icon || <Icon type="left" /> }
                onLeftClick={ this.onLeftClick }
                rightContent={ rightContent || '' }
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 999,
                    width: '100%',
                    borderBottom: '1px solid #f0f0f0'
                }}
                className={ className }
            >{ title }</NavBar>
        );
    }
}

export default Index;