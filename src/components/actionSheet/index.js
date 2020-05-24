import React from 'react';
import { ActionSheet } from 'antd-mobile';
import { observer } from 'mobx-react';
// less样式
import './index.less';

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

// 活动面板
const showActionSheet = ({ props, btns, className, params, getBtnsIndex, activeIndex }={ props: {}, btns: null, className: '', params: {}, getBtnsIndex: undefined, activeIndex: 0 }) => {
    const BUTTONS = btns || ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
        // 按钮列表
        options: BUTTONS,
        // 取消按钮 - 索引位置
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: activeIndex,
        title: '请选择规格',
        maskClosable: true,
        wrapProps,
        className: `showActionSheetWithOptions${className ? ` ${className}` : '' }`,
        ...params
    }, (btnIndex) => {
        getBtnsIndex && getBtnsIndex(btnIndex);
    });
};

export default showActionSheet;