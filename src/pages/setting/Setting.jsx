import React,{useState, useEffect} from 'react';
import { MdSettings } from "react-icons/md";
import Userdesignation from './Userdesignation';
import Team from './team/Team';
import Workplace from './Workplace';

const Setting = () => {

  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

 



  return (
    <div className="p-8 max-sm:p-0">
      <div className='flex justify-start items-center'>
        <MdSettings className='text-2xl text-orange-600' />
        <h2 className="text-xl font-bold ml-2">Setting</h2>
      </div>

      <div className='grid grid-cols-4 shadow-md gap-3 '>
        <div className=' col-span-1 shadow-lg p-4 h-auto'>
          {/* <div className='flex justify-around items-center p-1'>
            <RiUser3Fill className='text-5xl' />
            <div className=''>
              <p className='text-[20px]'>Emplyee Name</p>
              <p>employee@gmail.com</p>
            </div>
          </div> */}
          <hr />
          <ul className='flex flex-col justify-center items-start p-5'>
            <li onClick={() => handlePageChange(1)} className={`m-2 p-1 cursor-pointer ${activePage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>
              User & Designations</li>
            <li onClick={() => handlePageChange(2)} className={`m-2 p-1 cursor-pointer ${activePage === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Teams</li>
            <li onClick={() => handlePageChange(3)} className={`m-2 p-1 cursor-pointer ${activePage === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Workplace</li>
            <li onClick={() => handlePageChange(4)} className={`m-2 p-1 cursor-pointer ${activePage === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Shifts</li>
            <li onClick={() => handlePageChange(5)} className={`m-2 p-1 cursor-pointer ${activePage === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Breaks</li>
            <li onClick={() => handlePageChange(6)} className={`m-2 p-1 cursor-pointer ${activePage === 6 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Productivity Rules</li>
            <li onClick={() => handlePageChange(7)} className={`m-2 p-1 cursor-pointer ${activePage === 7 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Alert Rules</li>
            <li onClick={() => handlePageChange(8)} className={`m-2 p-1 cursor-pointer ${activePage === 8 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Email Reports</li>
            <li onClick={() => handlePageChange(9)} className={`m-2 p-1 cursor-pointer ${activePage === 9 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}>Compliance</li>
          </ul>
        </div>
        <div className='col-span-3 shadow-lg'>
          {activePage === 1 && (
            <div>
              <Userdesignation />
              {/* Add your content for page 1 here */}
            </div>
          )}
          {activePage === 2 && (
            <div>
              <Team />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <Workplace />
            </div>
          )}
 

        </div>

      </div>
    </div>
  )
}

export default Setting