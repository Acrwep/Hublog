// import React from 'react'
import { streamUserData } from '../../data/data';
// import Avatar from 'react-avatar';

import React from 'react';
import { Table } from 'antd';
import Avatar from 'react-avatar';

const CellContent = ({ data, width }) => {
    // Logic to determine the color and content of each cell based on data
    let backgroundColor = 'white';
    let content = '';

    // Example logic: Change backgroundColor and content based on your data
    if (data === 'punchIn') {
        backgroundColor = 'green'; // Green grid for punch-in
        content = 'Punch-In';
    } else if (data === 'punchOut') {
        backgroundColor = 'blue'; // Blue grid for punch-out
        content = 'Punch-Out';
    } else if (data === 'offline') {
        backgroundColor = 'pink'; // Pink grid for offline time
        content = 'Offline';
    } else if (data === 'breakTime') {
        backgroundColor = 'red'; // Red grid for break time
        content = 'Break Time';
    }

    return (
        <div className='flex'>
            <div style={{ backgroundColor, width:`${50}px`, height: '20px', lineHeight: '32px' }}></div>
            <div style={{ backgroundColor:'red', width:`${70}px`, height: '20px', lineHeight: '32px' }}></div>
            
        </div>
    );
};



const TimelineTable = ({ d }) => {
   

    const columns = [
        {
            title: '',
            width: 300,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
           
        },
        {
            title: '12:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '01:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '02:00 am',
            width: 100,
            dataIndex: 'timer2',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '03:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '04:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '05:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '06:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '07:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '08:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '09:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        {
            title: '10:00 am',
            width: 100,
            dataIndex: 'timer1',
            key: 'timer1',
            render: (data) => <CellContent data={data} />,
        },
        // Add similar columns for other time slots
        // Remember to replace 'timer1', 'timer2', etc. with actual data keys
    ];
    const da = () => {
                return (
                    streamUserData.map((user, index) => (
                        <>
                            <div key={index} className='flex justify-start m-3'>
                                <Avatar name={user.name} size="50" round={true} />
                                <div className='mx-3'>
                                    <h3>{user.name}</h3>
                                    <h6 className='text-[13px]'>{user.email}</h6>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))
                )
            }

    const data = [
        { key: '1',name:da()[0], timer1: 'punchIn',timer2: 'breakTime' },
        { key: '2',name:da()[1], timer1: 'punchOut' },
        // Add more data objects for other users
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            scroll={{ x: 1500 }}
        />
    )


   
    
}

export default TimelineTable;
