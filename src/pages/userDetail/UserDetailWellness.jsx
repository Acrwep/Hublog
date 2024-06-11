import React from 'react'

const UserDetailWellness = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-1 h-80 shadow-lg '>
                    Wellness
                    <hr />
                </div>
                <div className='col-span-2 h-80 shadow-lg '>
                    Monthly Wellness<hr />
                </div>
            </div>
            <div className='w-full h-80 shadow-lg mt-5'>
                Details
                <hr />
            </div>
        </div>
    )
}

export default UserDetailWellness