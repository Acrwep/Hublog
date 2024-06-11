import React from 'react';
import { Table, Progress } from 'antd';

const dataSource = [
  { name: 'OPERATION', percentage: 30 },
  { name: 'BRANCH OPERATION', percentage: 50 },
  { name: 'QUALITY', percentage: 70 },
];
const dataSource1 = [
    { name: 'EXTERNAL HR', percentage: 30 },
    { name: 'OPERATION', percentage: 50 },
    { name: 'BRANCH OPERATION', percentage: 70 },
  ];

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: 'percentage',
    key: 'percentage',
    width:350,
    render: (percentage) => (
      <div style={{ height: 15 }}>
      <Progress percent={percentage} strokeLinecap="butt" status="active" strokeWidth={12} />
    </div>
    ),
  },
];

const MyTable = ({data}) => {
   
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  );
};

export default MyTable;


export const MyTable2 = () =>{
    return (
        <Table dataSource={dataSource1} columns={columns} pagination={false} />
      );
}