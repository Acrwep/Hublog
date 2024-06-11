import React from 'react'
import Avatar from 'react-avatar'

const DateWiseAttendance = () => {
  return (
    <div>
        <div className='grid grid-cols-2 gap-8 p-1'>
            <div className='shadow-xl rounded-md h-96 p-2'>
                <p>Present- </p>
                <hr />
                <div className='flex justify-between items-center m-2'>
                    <div className='flex items-center'>
                    <Avatar name='E' size="50" round={true}/>
                    <h2 className='ml-1'>Employee name</h2>
                    </div>
                    <p>9:00 am</p>
                </div>
            </div>
            <div className='shadow-xl rounded-md h-96 p-2'>
                <p>Absent-</p>
                <hr />
            </div>
        </div>
    </div>
  )
}

export default DateWiseAttendance