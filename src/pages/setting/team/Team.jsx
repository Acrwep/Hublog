import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Team = () => {
    return (
        <div className='p-2'>
            <div className='flex justify-between'>
                <p className='text-[22px] text-gray-700'>Team</p>
                <button className='bg-blue-500 px-5 py-2 rounded-lg'>+ AddTeam</button>
            </div>
            <hr className='my-4' />
            <div className='grid grid-cols-3 gap-4'>
                <div className='cols-span-1 shadow-md rounded-md'>
                    <div className='flex'>
                        <input type='search' className=' w-2/7 h-8 border border-gray-500 rounded-tl-lg rounded-bl-lg mt-5 ml-5' />
                        <div className='w-12 border border-gray-500 p-1 mt-5 h-8 rounded-tr-lg rounded-br-lg text-2xl'><IoSearchSharp /></div>
                    </div>

                    <div className='p-4'>
                        <ul className='text-gray-600'>
                            <li className='p-2'>OPERATION</li>
                            <li className='p-2'>EXTERNAL HR</li>
                            <li className='p-2'>Sales Executive</li>
                            <li className='p-2'>INTERNAL HR</li>
                            <li className='p-2'>QUALITY</li>
                            <li className='p-2'>SEO</li>
                            <li className='p-2'>BOE</li>
                        </ul>
                    </div>
                </div>
                <div className=' col-span-2 shadow-md rounded-md'>

                    
                </div>
            </div>
        </div>
    )
}

export default Team