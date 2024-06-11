import React from 'react'
import DoughnutChart from '../../components/chart/DoughnutChart'; // Import the DoughnutChart component
// import BarChart from '../../components/chart/BarChart'; // Import the BarChart component
import LineChart from '../../components/chart/LineChart'; // Import the LineChart component
import { LineCharts } from '../../components/chart/RangeChart';

const Summary = () => {

    const doughnutData = {
        labels: ['Present', 'Absent'],
        datasets: [{ data: [75, 25] }],
    };

    const lineData = {
        dates: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06','2024-02-07',], // Sample dates
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        present: [65, 59, 80, 81, 56, 55, 40],
        absent: [35, 41, 20, 19, 44, 45, 60],
        attendancePercentage: [],
        averageWorkingHours: [],
    };

    const lineData1 = {
        labels: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06',], // Sample dates
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        // activeTime: [45, 51, 30, 30, 64, 55],
        // idealTime: [35, 41, 20, 19, 44, 45],

        datasets: [
            {
                label: 'Active Time',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Ideal Time',
                data: [35, 41, 20, 19, 44, 45],
                borderColor: 'rgba(0, 0, 0, 1)',
            },
        ],
    };

    const lineData2 = {
        labels: ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06',], // Sample dates
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        // productiveTime: [45, 51, 35, 37, 64, 55],
        // unProductiveTime: [0, 0, 0, 0, 0, 0],
        // naturalTime: [40, 35, 30, 28, 54, 50],
        datasets: [
            {
                label: 'Productive Time',
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'UnProductive Time',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(0, 0, 0, 1)',
            },
            {
                label: 'Natural Time',
                data: [10, 20, 30, 40, 50, 60, 70],
                borderColor: 'rgba(0, 0, 255, 1)',
            },
        ],
    };
    return (
        <div className=''>
            <div className='grid grid-cols-4 gap-8 mt-5 w-full h-24 max-sm:grid-cols-1'>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Attendence %</p>
                        <h2 className='my-2'>52.46</h2>
                        <p className='text-[12px]'><span className='text-red-400'>3.75%</span> less then last period</p>
                    </div>
                    <div></div>
                </div>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Late Arrivals</p>
                        <h2 className='my-2'>0 %</h2>
                        <p className='text-[12px]'>same as previous day</p>
                    </div>
                    <div></div>
                </div>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Break Time</p>
                        <h2 className='my-2'>145h:41:m</h2>
                        <p className='text-[12px]'><span className='text-red-400'>57h:20m</span> less then last period</p>
                    </div>
                    <div></div>
                </div>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'><div>
                    <p className=' text-[12px]'>Working Time</p>
                    <h2 className='my-2'>2k h:37:m</h2>
                    <p className='text-[12px]'><span className='text-red-400'>310h:23m</span> less then last period</p>
                </div>
                    <div></div></div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-5 max-sm:grid-cols-1">
                <div className=' col-span-1 shadow-lg p-12 bg-white'>
                    <h5 className='mb-3'>Today's Attendance</h5>
                    <div>
                        <hr />
                        <DoughnutChart data={doughnutData} />
                    </div>
                    {/* <div className='flex justify-center w-full mt-2'>
                        <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
                        <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div>
                    </div> */}
                </div>
                <div className=' col-span-2 shadow-lg p-12 bg-white max-sm:p-0'>
                    <h5 className='mb-3 '> Attendance Trend</h5>
                    <div className=' h-80'>
                        <hr />
                        <LineChart data={lineData} />
                    </div>
                </div>
            </div>
            {/* <div className='grid grid-cols-2 gap-8 max-sm:grid-cols-1'>
        <div className="mt-8 col-span-1 shadow-lg p-8 max-sm:p-0">
          <h5 className='mb-3'>Most Productive Team</h5>
          <div>
            <hr />
            <BarChart data={barData} orientation="horizontal" />
          </div>
        </div>
        <div className="mt-8 col-span-1 shadow-lg p-8 max-sm:p-0">
          <h5 className='mb-3'>Most Active Team</h5>
          <div>
            <hr />
            <BarChart data={barData1} orientation="horizontal" />
          </div>
        </div>
      </div> */}
            <div className='grid grid-cols-2 gap-8 max-sm:grid-cols-1'>
                <div className='mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:w-full max-sm:p-0'>
                    <h5 className='mb-3'>Break Trend</h5>
                    <div className=''>
                        <hr />
                        <LineCharts data={lineData1} />
                    </div>
                </div>
                <div className='mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:grid-cols-1 max-sm:p-0'>
                    <h5 className='mb-3'>Late Arrivals Trend</h5>
                    <div className=''>
                        <hr />
                        <LineCharts data={lineData2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary