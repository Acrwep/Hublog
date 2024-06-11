import React from 'react'
import DoughnutChart from '../../../components/chart/DoughnutChart';
import BarChart from '../../../components/chart/BarChart';

const Summary = () => {
    const doughnutData = {
        labels: ['Unmapped', 'Internet', 'Music & video', 'Social medis', 'Design', 'Hiring & Recuritment', 'File sharing', 'Education', 'Research & Refrence', 'News & Entertainment', 'Email'],
        datasets: [{ data: [46, 25, 5, 5, 5, 5, 5, 1, 1, 1, 1] }],
    };

    const barData = {
        labels: ['MyZwnv2', 'Chrome', 'Explorer', 'code', 'Adobe Premier Pro', 'Figma', 'Photoshop', 'ShellExperienceHost', 'ApplicationFrameHost', 'EXCEL'],
        datasets: [
            {
                label: 'Percentage',
                backgroundColor: 'green',
                barThickness: 10,
                data: [36, 15, 13, 10, 7, 6,4,3,3,2], // Sample percentages
            },
        ],
    };
    return (
        <div>
            <div className='grid grid-cols-3 gap-8 mt-5 w-full h-24 max-sm:grid-cols-1'>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Top Application</p>
                        <h2 className='my-2'>https://docs.google.com/</h2>
                        <p className='text-[12px]'>235h:41:m</p>
                    </div>
                    <div></div>
                </div>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Top URL</p>
                        <h2 className='my-2'>https://docs.google.com/</h2>
                        <p className='text-[12px]'>295h:41:m</p>
                    </div>
                    <div></div>
                </div>
                <div className=' col-span-1 w-full p-3 flex justify-between shadow-lg rounded-sm'>
                    <div>
                        <p className=' text-[12px]'>Top Category</p>
                        <h2 className='my-2'>Chrome</h2>
                        <p className='text-[12px]'>145h:41:m</p>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-3 m-10'>
                <div className=' col-span-1 row-span-1 shadow-lg p-1 m-2 bg-white'>
                    <h5 className='mb-3'>Today's Attendance</h5>
                    <div>
                        <hr />
                        <DoughnutChart data={doughnutData} />
                    </div>
                    <div className='flex justify-center w-full mt-2'>
                        {/* <div className='flex' ><div className=' w-2 h-6 bg-blue-600 rounded-lg mx-2'></div>75</div>
                        <div className='flex' ><div className=' w-2 h-6 bg-gray-600 rounded-lg mx-2'></div>25</div> */}
                    </div>
                </div>
                <div className='col-span-2 p-2 row-span-2'>
                    <div className=" col-span-1 shadow-lg p-1 bg-white max-sm:p-0">
                        <h5 className='mb-3'>Application usage</h5>
                        <div>
                            <hr />
                            <BarChart data={barData} orientation="horizontal" />
                        </div>
                    </div>
                    <div className="mt-5 col-span-1 shadow-lg p-8 bg-white max-sm:p-0">
                        <h5 className='mb-3'>URL usage</h5>
                        <div>
                            <hr />
                            <BarChart data={barData} orientation="horizontal" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Summary