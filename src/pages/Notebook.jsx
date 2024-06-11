import React from 'react'
import { GiNotebook } from "react-icons/gi";

const Notebook = () => {
  return (
    <div className="p-8 max-sm:p-0">
      <div className='flex justify-start items-center'>
        <GiNotebook className='text-2xl text-blue-600' />
        <h2 className="text-xl font-bold ml-2">Notebook</h2>
      </div>
      <div className='mt-12 w-full flex'>
        <input type='text' placeholder='Take a Note...' className=' w-1/2 h-16 p-5 mx-auto shadow-lg rounded-xl ' />
      </div>
    </div>
  )
}

export default Notebook