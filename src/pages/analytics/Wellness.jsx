import React from 'react';
import { GiLotus } from "react-icons/gi";
import Dropdown from '../../components/dropdown/Dropdown';
import { MdRefresh, MdDownload } from 'react-icons/md';
import DateRangePicker from '../../components/dateRangePicker/DatePicker';
import DoughnutChart from '../../components/chart/DoughnutChart'; 
// import LineChart from '../../components/chart/LineChart';
import { WellnessBarChart } from '../../components/chart/BarChart';

const Wellness = () => {

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{ data: [75, 25] }],
  };

  // const lineData = {
  //   labels: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06',], // Sample dates
  //   // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   present: [65, 59, 80, 81, 56, 55, 40],
  //   absent: [35, 41, 20, 19, 44, 45, 60],
  //   // attendance: [30, 40, 10, 20, 50],
  //   // averageWorkingHours: [5, 7, 1, 3, 9, 13],
  // };

  return (
    <div className='p-8 max-sm:p-0'>
      <div className='flex justify-start items-center'>
        <GiLotus className='text-2xl text-blue-600' />
        <h2 className="text-xl font-bold ml-2">Wellness</h2>
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
      <div className='grid grid-cols-4 gap-8 mt-5 w-full h-24 max-sm:grid-cols-1'>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Healthy employees</p>
            <h2 className='my-2'>52.46</h2>
            <p className='text-[12px]'><span className='text-red-400'>3.75%</span> More than previous day</p>
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Working time</p>
            <h2 className='my-2'>47.83%</h2>
            <p className='text-[12px]'>Less than previous day</p>
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Overburdened employee</p>
            <h2 className='my-2'>Employee Name</h2>
            {/* <p className='text-[12px]'><span className='text-red-400'>57h:20m</span> less then last period</p> */}
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'><div>
          <p className=' text-[12px]'>Underutilized employee</p>
          <h2 className='my-2'>Employee Name</h2>
          {/* <p className='text-[12px]'><span className='text-red-400'>310h:23m</span> less then last period</p> */}
        </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-8 mt-8 max-sm:grid-cols-1'>
      <div className=' col-span-1 shadow-lg p-5 bg-white'>
          <h5 className='mb-3'>Overall Wellness</h5>
          <hr />
          <div>
            <DoughnutChart data={doughnutData} />
          </div>
          <div className='flex justify-center w-full mt-2'>
            <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
            <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div>
          </div>
        </div>
        <div className=' col-span-1 shadow-lg p-5 bg-white'>
          <h5 className='mb-3'>Top Healthy </h5>
          <hr />
          <div>
            <DoughnutChart data={doughnutData} />
          </div>
          <div className='flex justify-center w-full mt-2'>
            <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
            <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div>
          </div>
        </div>
        <div className=' col-span-1 shadow-lg p-5 bg-white'>
          <h5 className='mb-3'>Top Overburdened</h5>
          <hr />
          <div>
            <DoughnutChart data={doughnutData} />
          </div>
          <div className='flex justify-center w-full mt-2'>
            <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
            <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div>
          </div>
        </div>
        <div className=' col-span-1 shadow-lg p-5 bg-white'>
          <h5 className='mb-3'>Top Underutilized</h5>
          <hr />
          <div>
            <DoughnutChart data={doughnutData} />
          </div>
          <div className='flex justify-center w-full mt-2'>
            <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
            <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div>
          </div>
        </div>
      </div>
      <div>
        <div className=' grid grid-cols-1 shadow-lg p-12 bg-white max-sm:p-0'>
          <h5 className='mb-3 '> Team Wise Productivity Breakdown</h5>
          <div className=' h-80'>
            <hr />
            {/* <LineChart data={lineData} displayFields={['present', 'absent']} yOptions={{ type: 'logarithmic', display: false }}
              y1Options={{ type: 'linear', display: false, min: 0, max: 24 }} /> */}
              <WellnessBarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wellness