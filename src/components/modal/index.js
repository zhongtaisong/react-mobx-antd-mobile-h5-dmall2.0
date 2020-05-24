import React from 'react';
import { Modal } from 'antd-mobile';
import { observer } from 'mobx-react';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

// 模态框
@observer
class Index extends React.Component {

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {
        const { visible=false, children, navBar } = this.props;
        return (
            <Modal
                {...this.props}
                visible={ visible }
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                { navBar }
                <div style={{ paddingTop: '44px' }}>
                    { children }
                </div>
            </Modal>
        );
    }
}

export default Index;