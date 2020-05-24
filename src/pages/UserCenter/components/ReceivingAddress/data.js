import React from 'react';
import { Popconfirm } from 'antd';
// 数据
import state from './state';
    
// 表头
export const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: '6%',
        render: (text, record, index) => `${index+1}`
    },
    {
        title: '收货人',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        width: '10%',
        ellipsis: true
    },
    {
        title: '所在地区',
        dataIndex: 'region',
        key: 'region',
        align: 'center',
        width: '10%',
        ellipsis: true
    },
    {
        title: '详情地址',
        dataIndex: 'detail',
        key: 'detail',
        align: 'center',
        width: '30%',
        ellipsis: true
    },
    {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
        width: '10%',
        ellipsis: true
    },
    {
        title: '默认地址',
        dataIndex: 'isDefault',
        key: 'isDefault',
        align: 'center',
        width: '10%',
        render: (text, record, index) => {
            record.isDefault = Number(record.isDefault);
            return text && text == 1 ? '是' : "否";
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        width: '148px',
        render: (text, record, index) => {
            return (
                <div className='operation'>
                    <Popconfirm title="你确定要删除？" onConfirm={ () => state.delAddressData({
                        id: record.id
                    }) }>
                        <a>删除</a>
                    </Popconfirm>
                    <a onClick={ () => { 
                            state.setVisible( true );
                            state.setAddressModalData( record );
                            state.setId(record.id);
                        } 
                    }>修改</a>
                </div>
            );
        }
    }
];