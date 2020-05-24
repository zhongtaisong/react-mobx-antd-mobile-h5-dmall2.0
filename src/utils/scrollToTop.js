import React from 'react';
import { withRouter } from 'react-router-dom';

// 跳转路由页面滚动至顶部
class ScrollToTop extends React.Component {

    componentDidMount() {
        this.props.history.listen(() => {
            // 当路由切换时
            window.scrollTo(0, 0);
        });
    }

    componentWillReceiveProps(nextProps) {
        // 当路由切换时
        if (this.props.location !== nextProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);