import React from 'react'
import DoughnutChart from '../../components/chart/DoughnutChart';
import { ProductiveBarChart } from '../../components/chart/BarChart';
// import LineChart from '../../components/chart/LineChart';
import MyTable, { MyTable2 } from '../../components/table/DemoTable';

const Productivity = () => {

  const doughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{ data: [75, 25] }],
  };

  return (
    <div className='p-8 max-sm:p-0'>
      <div className='grid grid-cols-4 gap-8 mt-5 w-full h-24 max-sm:grid-cols-1'>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Activity</p>
            <h2 className='my-2'>52.46</h2>
            <p className='text-[12px]'> 772h:45m</p>
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Top Application</p>
            <h2 className='my-2'>Chrome</h2>
            <p className='text-[12px]'>990h:44m</p>
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
          <div>
            <p className=' text-[12px]'>Top URL</p>
            <h2 className='my-2'>www.google.doc...</h2>
            <p className='text-[12px]'> 145h:41:m</p>
          </div>
          <div></div>
        </div>
        <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'><div>
          <p className=' text-[12px]'>Top Category</p>
          <h2 className='my-2'>Internate</h2>
          <p className='text-[12px]'> 310h:23m</p>
        </div>
        </div>
      </div>

      <div className=' grid grid-cols-3 grid-rows-2 gap-8'>
        <div className='col-span-1 row-span-2 block mt-5'>
          <div className=' shadow-lg p-12 bg-white mt-1'>
            <h5 className='mb-3'>Productivity Breakdown</h5>
            <hr />
            <div>
              <DoughnutChart data={doughnutData} />
            </div>
          </div>
          
        </div>
        {/* <div className=' w-full'> */}
        <div className=" col-span-2 row-span-1 mt-5 shadow-lg p-2 bg-white max-sm:p-0">
          <h5 className='mb'>Most Productive Team</h5>
          <div className=''>
            <hr />
            <MyTable2 />
          </div>
        </div>
        <div className="  col-span-2 mt-1 row-span-1 shadow-lg p-2 bg-white max-sm:p-0">
          <h5 className='mb'>Least Productive Team</h5>
          <div>
            <hr />
            <MyTable />
          </div>
        </div>
        {/* </div> */}
      </div>

      <div>
        <div className=' grid grid-cols-1 shadow-lg p-12 max-sm:p-0'>
          <h5 className='mb-3 '> Team Wise Productivity Breakdown</h5>
          <div className=' h-80'>
            <hr />
              <ProductiveBarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productivity