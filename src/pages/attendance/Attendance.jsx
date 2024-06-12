import React, { useState, useEffect } from "react";
import { MdRefresh, MdDownload } from "react-icons/md";

import Dropdown from "../../components/dropdown/Dropdown";
import { Button, Tooltip } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import DateRangePicker from "../../components/dateRangePicker/DatePicker";

import { TbCirclesFilled } from "react-icons/tb";
import Summary from "./Summary";
import AttendanceDetail from "./AddendanceDetail";
import DateWiseAttendance from "./DateWiseAttendance";
import withLogin from "../../components/withLogin";
import "./styles.css";

const Attendance = () => {
  // Sample data for charts
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setActivePage(1);
  }, []);

  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <div className="attendance_iconContainer">
            <TbCirclesFilled size={20} className="attendance_icon" />
          </div>
          <h2 className="text-xl font-bold ml-4" style={{ fontSize: "25px" }}>
            Attendance
          </h2>
        </div>
        {/* <ul className="flex w-96 shadow-lg rounded">
          <li
            onClick={() => handlePageChange(1)}
            className={`m-2 p-1 cursor-pointer ${
              activePage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
          >
            Summary
          </li>
          <li
            onClick={() => handlePageChange(2)}
            className={`m-2 p-1 cursor-pointer ${
              activePage === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
          >
            Detailed
          </li>
          <li
            onClick={() => handlePageChange(3)}
            className={`m-2 p-1 cursor-pointer ${
              activePage === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
          >
            Datewise Attendance
          </li>
        </ul> */}

        <div className="summary_container">
          <Button
            className={
              activePage === 1
                ? "attendance_activesummarybutton "
                : "attendance_summarybutton"
            }
            onClick={() => handlePageChange(1)}
          >
            Summary
          </Button>
          <Button
            className={
              activePage === 2
                ? "attendance_activesummarybutton "
                : "attendance_summarybutton"
            }
            onClick={() => handlePageChange(2)}
          >
            Detailed
          </Button>
          <Button
            className={
              activePage === 3
                ? "attendance_activesummarybutton "
                : "attendance_summarybutton"
            }
            onClick={() => handlePageChange(3)}
          >
            Datewise Attendance
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <DateRangePicker />
          </div>
          <Tooltip placement="top" title="Download PDF">
            <Button className="dashboard_download_button">
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div>
        {activePage === 1 && (
          <div>
            <Summary />
            {/* Add your content for page 1 here */}
          </div>
        )}
        {activePage === 2 && (
          <div>
            <AttendanceDetail />
          </div>
        )}
        {activePage === 3 && (
          <div>
            <DateWiseAttendance />
          </div>
        )}
      </div>
    </div>
  );
};

export default withLogin(Attendance);
