import React from 'react'
import { Slider } from 'antd';



const Workplace = () => {

    // const marks = {
    //     1: '1',
    //     23: '23'
    // };
   

    const handleChange = value => {
        
        console.log(value);
    };
    // const trackStyle = {
    //     background: '#f50' 
    // };
    // const getGradientColor = (value) => {
    //     if (value <= 4) {
    //         return '#f00'; 
    //       } else if (value <= 8) {
    //         return '#808080'; 
    //       } else {
    //         return '#00f'; 
    //       }
    //   };
    return (
        <div>
            <div><p className=' text-lg p-2'>Workplace</p> <hr className='mt-2' /></div>
            <div>
                <p className=' text-lg p-2'>Half Day</p>
                <p className='p-2'>Set your minimum presence and half day thresholds to define the half-day for your organization.</p>
            </div>
            <div>
                <Slider 
                min={0}
                max={23}
                defaultValue={[0, 23]} />
                <Slider
                    min={0}
                    max={23}
                    range
                    defaultValue={[1, 23]}
                    // marks={marks}
                    onChange={handleChange}
                    
                />

            </div>
        </div>
    )
}

export default Workplace

