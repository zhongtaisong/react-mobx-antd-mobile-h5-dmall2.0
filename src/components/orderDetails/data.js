import React from 'react';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';

export const columns02 = [
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text, record, index) => <img className='imgs_style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
        title: '商品',
        dataIndex: 'description',
        key: 'description',
        width: '40%',
        render: (text, record, index) => <Link to={'/views/products/detail/' + record.id}>{ text }</Link>
    },
    {
        title: '规格',
        dataIndex: 'spec',
        key: 'spec',
        width: '30%'
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: '10%',
        render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center',
        width: '10%',
        render: (text, record, index) => `x ${text}`
    }
];