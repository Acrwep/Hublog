import React from 'react'
import { RiSuitcaseFill } from "react-icons/ri";
import Dropdown from '../components/dropdown/Dropdown';
import { MdRefresh } from 'react-icons/md';
import Table from '../components/table/Table';


const Project = () => {
  const data =[];
  const columns = [
    { title: 'Data', key: 'data', width: '150px' },
    { title: 'Alert Description', key: 'alertdescription',width: '150px' },
    { title: 'Alert Type', key: 'alerttype',width: '150px' },
    { title: 'Triggered for', key: 'triggeredfor',width: '150px' },
    { title: 'Triggered time', key: 'triggeredtime',width: '150px' },
  ];
  return (
    <div className='p-8 max-sm:p-0'>
       <div className='flex justify-start items-center'>
        <RiSuitcaseFill className='text-2xl text-blue-600' />
        <h2 className="text-xl font-bold ml-2">Project</h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <button className="text-blue-500 p-1 border border-black rounded-md">
              <MdRefresh />
            </button>
          </div>
        </div>
      </div>
      <div>
        <Table data={data} columns={columns}/>
        <p className='text-center'>No Data</p>
      </div>
    </div>
  )
}

export default Project