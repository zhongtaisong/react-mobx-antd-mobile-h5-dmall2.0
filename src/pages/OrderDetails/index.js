import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
// 全局公共组件
import { OrderDetails, NavBar } from '@com';

// 订单详情
@observer
class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        const { state } = this.props.location || {};
        state && state.id && this.setState({
            id: state.id
        });
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader(false);
            this.props.setIsShowTab && this.props.setIsShowTab(false);
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        try {
            this.props.setIsShowHeader && this.props.setIsShowHeader();
            this.props.setIsShowTab && this.props.setIsShowTab();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { id } = this.state;
        if( id ){
            return (
                <Fragment>
                    <NavBar {...this.props} title='订单详情' />
                    <OrderDetails 
                        id={ this.state.id }
                        {...this.props}
                    />
                </Fragment>
            );
        }else{
            return '';
        }
    }
}

export default Index;