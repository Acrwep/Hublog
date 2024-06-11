import React from 'react'

const UserAppsAndUrl = () => {
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
        <div className='grid grid-cols-3 gap-5 shadow-lg rounded-md'>
            <div className=' h-80 shadow-lg'>
                <p>Category Utilization</p>
                <hr />
            </div>
            <div className='shadow-lg'>
                <p>Total Application usage</p>
                <hr />
            </div>
            <div className='shadow-lg'>
                <p>Total URL usage</p>
                <hr />
            </div>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default UserAppsAndUrl