import React,{useState} from 'react'
import { TbReport, TbBellFilled } from "react-icons/tb";
import { MdOutlineDevicesOther } from "react-icons/md";
import Model from '../components/model/Model'


const Reports = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };


  const data = [
    { icon: <TbReport />, heading: 'Daily Attendance', para: 'Download reports of the daily attendance of your organisation including punch-in and punch-out timing. ' },
    { icon: <TbReport />, heading: 'Monthly Attendance', para: 'Download reports of the monthly attendance of your organisation including punch-in and punch-out timing. ' },
    { icon: <TbReport />, heading: 'Monthly In-Out Attendance', para: 'Download reports of the monthly in-out attendance of your organisation including punch-in and punch-out timing. ' },
    { icon: <TbReport />, heading: 'Apps&URLs report', para: 'Download the detailed application/URL ussage of your organisation ' },
    { icon: <TbReport />, heading: 'Productivity Report', para: 'Download the productive report of your organisation. ' },
    { icon: <TbReport />, heading: 'Activity Report', para: 'Download the activity report of your organisation. ' },
    { icon: <TbReport />, heading: 'Break report', para: 'Download reports of break taken by employees. ' },
    { icon: <TbReport />, heading: 'Team Insight', para: 'View the team wise insights for your organisation incluting key indicators and outliers. ' },
    { icon: <TbReport />, heading: 'Project Report', para: 'View and Download reports for comprehensive insight into task, progress status and duration spend by each assignee on task. ' },
    { icon: <TbBellFilled />, heading: 'Alert Report', para: 'View and Download reports of the all triggered alerts for your organisation. ' },
    { icon: <MdOutlineDevicesOther />, heading: 'Device Report', para: 'Download the comprehensive devices report of your organisation. ' },
    { icon: <TbReport />, heading: 'Dynamic report', para: 'Customise, save and download reports of the key indicators and metrics of your organisation. ' },

  ]
  return (
    <div className='p-8 max-sm:p-0'>
      <div className='flex justify-start items-center'>
        <TbReport className='text-2xl text-blue-600' />
        <h2 className="text-xl font-bold ml-2">Reports</h2>
      </div>
      <div className='flex flex-wrap gap-5'>
        {
          data.map((item, index) => (
            <>
              <div onClick={openModal} className='w-[280px] h-[200px] flex flex-col justify-center items-center mt-8 bg-white shadow-lg rounded-xl hover:transform hover:scale-105 transition-transform cursor-pointer'>
                <p className=' text-3xl bg-green-300 p-3 rounded-2xl'>{item.icon}</p>
                <p className=' text-[16px]'>{item.heading}</p>
                <p className='text-[13px] text-center text-gray-500 p-2'>{item.para}</p>
              </div>
            </>
          ))
        }
      </div>
      <Model isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Reports