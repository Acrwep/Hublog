import React from 'react'
import Table from '../../components/table/Table'

const UserProductivity = () => {

    const data =[
        {onlinetime:'00h:00m:00s',productivetime:'00h:00m:00s',unproductivetime:'00h:00m:00s',naturaltime:'00h:00m:00s',breaktime:'00h:00m:00s',productivity:''},
    
    ];
  const columns = [
    { title: 'Online time', key: 'onlinetime', width: '150px' },
    { title: 'Productive Time', key: 'productivetime',width: '150px' },
    { title: 'Unproductive time', key: 'unproductivetime',width: '150px' },
    { title: 'Neutral time', key: 'naturaltime',width: '150px' },
    { title: 'Break time', key: 'breaktime',width: '150px' },
    { title: 'Productivity %', key: 'productivity',width: '150px' },
  ];
    return (
        <div className='p-1 grid gap-4'>
            <div className='grid grid-cols-3 gap-5 shadow-lg rounded-md'>
                <div className='h-32 shadow-lg'>
                    <p>Top Appication</p>
                    <hr />
                </div>
                <div className='shadow-lg'>
                    <p>Top URLs</p>
                    <hr />
                </div>
                <div className='shadow-lg'>
                    <p>Top Category</p>
                    <hr />
                </div>
            </div>

            <div className='shadow-lg rounded-md h-96 p-2'>
                <p>Productivity Breakdown</p>
                <hr />
            </div>
            <div className='shadow-lg rounded-md p-2'>
            <p>Detailed</p>
                <hr />
                <Table data={data} columns={columns} />
            </div>
        </div>
    )
}

export default UserProductivity