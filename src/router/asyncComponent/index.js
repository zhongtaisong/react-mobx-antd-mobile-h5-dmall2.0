import React, { Component } from 'react';
// 代码切片(按需加载)
// importComponent 是使用了import()的函数
export default (importComponent) => {
    class AsyncComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {
                component: null  // 动态加载的组件
            };
        }

        componentDidMount() {
            importComponent().then(mod => {
                this.setState({
                    // 同时兼容ES6和CommonJS的模块
                    component: mod.default ? mod.default : mod
                });
            }).catch(err => {
                console.log(err);
            });
        }

        render() {
            const C = this.state.component;
            // 渲染动态加载的组件
            return C ? <C {...this.props} /> : null;
        }

    }
    return AsyncComponent;
};