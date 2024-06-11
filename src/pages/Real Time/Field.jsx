import React from 'react'
import Dropdown from '../../components/dropdown/Dropdown';
import { MdRefresh, MdDownload } from 'react-icons/md';
import DateRangePicker from '../../components/dateRangePicker/DatePicker';
import { GrMapLocation } from "react-icons/gr";
import { streamUserData } from '../../data/data';
import Avatar from 'react-avatar';

const Field = () => {
  return (
    <div className='p-8 max-sm:p-0'>
      <div className='flex justify-start items-center'>
        <GrMapLocation className='text-2xl text-blue-600' />
        <h2 className="text-xl font-bold ml-2">Field</h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <DateRangePicker />
          </div>
          <div>
            <button className="text-blue-500 p-1 m-1 border border-black rounded-lg">
              <MdDownload />
            </button>
            <button className="text-blue-500 p-1 border border-black rounded-md">
              <MdRefresh />
            </button>
          </div>
        </div>
      </div>

      <div className=' grid grid-cols-3 gap-1 mt-4'>
        <div className='col-span-1 shadow-lg '>
          <div className='  h-[450px] p-5'>
            <h2 className='text-[13px] '>Punched In User</h2>
            <hr />
            <div className='overflow-y-auto h-[400px]'>
              {
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
              }
            </div>
          </div>
        </div>
        <div className='col-span-2 h-[450px] shadow-lg rounded-md m-3'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d64128957.5739181!2d79.44681508403109!3d11.178679955030265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1708326411006!5m2!1sen!2sin"className='w-full' height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" title='map' referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

    </div>
  )
}

export default Field