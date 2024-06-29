import React, { useState } from "react";
import { CiStreamOn } from "react-icons/ci";
import Dropdown from "../../Components/dropdown/Dropdown";
import { MdRefresh } from "react-icons/md";
// import DateRangePicker from '../../Components/dateRangePicker/DatePicker';
import { streamUserData } from "../../data/data";
import Avatar from "react-avatar";
import { GoClock } from "react-icons/go";
import Model from "../../Components/model/Model";

const LiveStream = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-start items-center">
        <CiStreamOn className="text-2xl text-blue-600" />
        <h2 className="text-xl font-bold ml-2">Livestream</h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          {/* <div>
            <DateRangePicker />
          </div> */}
          <div>
            {/* <button className="text-blue-500 p-1 m-1 border border-black rounded-lg">
              <MdDownload />
            </button> */}
            <button className="text-blue-500 p-1 m-1 border border-black rounded-md">
              <MdRefresh />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-start flex-wrap">
        {streamUserData.map((data, index) => (
          <div
            key={index}
            className=" w-72 h-44 p-3 m-2 bg-white shadow-md rounded-md flex flex-col justify-between cursor-pointer"
            onClick={openModal}
          >
            <div className="flex">
              <Avatar name={data.name} size="50" round={true} />
              <div className="mx-3">
                <h3>{data.name}</h3>
                <h6>{data.email}</h6>
              </div>
            </div>
            <div className="m-2 flex">
              <img src={data.browserLogo} alt="" className=" w-10 h-10" />
              <h2 className="m-2">{data.browserName}</h2>
            </div>
            <div className="text-[12px] flex bottom-0">
              <div className="m-1">
                <GoClock />
              </div>
              {data.activeTime}
            </div>
          </div>
        ))}
      </div>
      <Model isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LiveStream;
