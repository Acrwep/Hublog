import React from 'react'
import Sidebar from './Sidebar'
import Navbar from '../pages/Navbar'
import { Outlet } from 'react-router-dom'


const Content = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className=''>
      <Sidebar />
      </div>
      <div className='block w-full overflow-y-auto bg-gray-50'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Content