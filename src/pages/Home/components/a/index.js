import React from 'react';

export default class A extends React.Component {

    zhong = () => {
        console.log('1111111111', '我是A组件', this, this.n, this.song);
    }

    render() {
        return <div>111111111</div>;
    }
}