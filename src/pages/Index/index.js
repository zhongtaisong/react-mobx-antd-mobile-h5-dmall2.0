import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import Routes from '@router';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';
// 根页面
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null
        };
    }

    componentWillMount() {        
        this.props.history && state.setHistory( this.props.history );
        window.History = this.props.history;
    }

    initDid = () => {
        state.oauthData();
        state.adminData();
    }

    componentDidMount() {
        this.initDid();
    }

    componentWillReceiveProps() {
        this.initDid();
    }

    render() {
        const { oauthCode } = $state;
        const { isShowLogo, setIsShowLogo, cancelText, setCancelText, onCancel, setOnCancel, isShowHeader, setIsShowHeader, isPaddingBottm, setIsPaddingBottm, isShowTab, setIsShowTab, isShowFooter, setIsShowFooter } = state;
        return (
            <div>
                {
                    isShowHeader ? (
                        <HeaderBar {...this.props} 
                            isShowLogo={ isShowLogo }
                            cancelText={ cancelText }
                            onCancel={ onCancel }
                        />
                    ) : ''
                }
                <div style={ isPaddingBottm ? {
                    paddingTop: '44px'
                } : {} }>
                <Switch>
                    {
                        Routes.map((item, index) => {
                            if( item.redirect ){
                                if( oauthCode && oauthCode == 401 && item.noDirectAccess ){
                                    return (<Redirect from={ this.props.location.pathname } to={ '/login' } key={ index } />);
                                }else{
                                    return (<Redirect exact from={ item.path } to={ item.redirect } key={ index } />);
                                }
                            }else{
                                return (
                                    <Route exact path={ item.path } key={ index }
                                        render={
                                            props => {
                                                if( oauthCode == 401 && item.noDirectAccess ){
                                                    return (<Redirect from={ props.location.pathname } to={ '/login' } />);
                                                }else{
                                                    if( oauthCode ){
                                                        return (<item.component {...props} 
                                                            setIsShowLogo={ setIsShowLogo }
                                                            setCancelText={ setCancelText }
                                                            setOnCancel={ setOnCancel }
                                                            setIsShowHeader={ setIsShowHeader }
                                                            setIsPaddingBottm={ setIsPaddingBottm }
                                                            setIsShowTab={ setIsShowTab }
                                                            code={ oauthCode }
                                                            setIsShowFooter={ setIsShowFooter }
                                                        />);
                                                    }
                                                }
                                            }
                                        }
                                    />
                                );
                            }
                        })
                    }
                </Switch>
                </div>
                {/* {
                    isShowFooter ? (
                        <div className='page_footer'>我是有底线的</div>
                    ) : ''
                } */}
                {
                    isShowTab ? (
                        <FooterCopyright {...this.props} />
                    ) : ''
                }
            </div>
        );
    }
}

export default Index;