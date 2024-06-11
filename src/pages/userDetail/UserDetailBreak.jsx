import React from 'react'
import Table from '../../components/table/Table'

const UserDetailBreak = () => {

    const data =[
        
    ];
  const columns = [
    { title: 'Date', key: 'date', width: '150px' },
    { title: 'Break Type', key: 'breaktype',width: '150px' },
    { title: 'Break Start', key: 'breakstart',width: '150px' },
    { title: 'Break End', key: 'breakend',width: '150px' },
    { title: 'Break Duration', key: 'breakduration',width: '150px' },
  ];
  return (
    <div className='p-3'>
        <div className=' h-80 shadow-lg p-4'>
            <p>Break Trend</p>

        </div>
        <div className='w-full shadow-lg p-4'>
                <p>Detail</p>
                <div>
                    <Table  data={data} columns={columns}/>
                </div>
            </div>

    </div>
  )
}

export default UserDetailBreak