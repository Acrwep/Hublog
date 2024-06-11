import React from 'react'
import DoughnutChart from '../../components/chart/DoughnutChart';
import { VerticalBarChart } from '../../components/chart/BarChart';
// import LineChart from '../../components/chart/LineChart';
import MyTable, { MyTable2 } from '../../components/table/DemoTable';

const Activity = () => {

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

      <div className=' grid grid-cols-3 gap-8'>
        <div className='col-span-1 block'>
          <div className=' shadow-lg p-3 bg-white mt-8'>
            <h5 className='mb-3'>Online Time Breakdown</h5>
            <hr />
            <div>
              <DoughnutChart data={doughnutData} />
            </div>
          </div>
          <div className=' shadow-lg p-3 bg-white mt-5'>
            <h5 className='mb-3'>Activity Time Breakdown</h5>
            <hr />
            <div>
              <DoughnutChart data={doughnutData} />
            </div>
          </div>
        </div>
        <div className='col-span-2 block-inline  w-full'>
          <div className="m-10 shadow-lg p-8 bg-white max-sm:p-0">
            <h5 className='mb-3'>Most Active Team</h5>
            <div className=''>
              <hr />
              {/* <BarChart data={barData} orientation="horizontal" /> */}
              <MyTable />
            </div> 
          </div>
          <div className="m-10 shadow-lg p-8 bg-white max-sm:p-0">
            <h5 className='mb-3'>Least Active Team</h5>
            <div>
              <hr />
              {/* <BarChart data={barData} orientation="horizontal" /> */}
              <MyTable2 />
            </div>
          </div>
        </div>
      </div>

      <div>
      <div className=' grid grid-cols-1 shadow-lg p-12 bg-white max-sm:p-0'>
                    <h5 className='mb-3 '> Team Wise Activity Breakdown </h5>
                    <div className=''>
                        <hr />
                        <VerticalBarChart />
                        {/* <LineChart data={lineData} displayFields={['present', 'absent']} yOptions={{ type: 'logarithmic', display: false }}
                            y1Options={{ type: 'linear', display: false, min: 0, max: 24 }} /> */}
                    </div>
                </div>
      </div>
    </div>
  )
}

export default Activity