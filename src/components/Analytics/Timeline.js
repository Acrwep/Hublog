import React from "react";
import Dropdown from "../dropdown/Dropdown";
import { MdRefresh, MdDownload } from "react-icons/md";
import DateRangePicker from "../dateRangePicker/DatePicker";
import { VscGraphLine } from "react-icons/vsc";
import TimelineTable from "../table/TimelineTable";

const Timeline = () => {
  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-start items-center">
        <VscGraphLine className="text-2xl text-blue-600" />
        <h2 className="text-xl font-bold ml-2">Timeline</h2>
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
      <div>
        <TimelineTable />
      </div>
    </div>
  );
};

export default Timeline;
