import React from "react";
import DoughnutChart from "../components/chart/DoughnutChart";
// import BarChart from '../components/chart/BarChart';
import LineChart from "../components/chart/LineChart";
import Dropdown from "../components/dropdown/Dropdown";
import { MdRefresh } from "react-icons/md";
import { Tooltip, Button } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import DateRangePicker from "../components/dateRangePicker/DatePicker";
import { LineCharts } from "../components/chart/RangeChart";
import { MdDashboardCustomize } from "react-icons/md";
import MyTable, { MyTable2 } from "../components/table/DemoTable";
import withLogin from "../components/withLogin";
import "./styles.css";
// import { Progress } from 'antd';
// import { DatePicker } from 'antd';

const Dashboard = () => {
  // Sample data for charts

  const lineData = {
    dates: ["02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-06"],
    present: [40, 30, 35, 50, 40, 35, 10],
    absent: [10, 20, 15, 0, 10, 15, 40],
    attendancePercentage: [80, 65, 70, 75, 85, 70, 65],
    averageWorkingHours: [6.5, 6.7, 7.0, 9, 7.2, 8, 7.1],
  };

  const lineData1 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    // activeTime: [45, 51, 30, 30, 64, 55],
    // idealTime: [35, 41, 20, 19, 44, 45],

    datasets: [
      {
        label: "Active Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Ideal Time",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const lineData2 = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
    ], // Sample dates
    datasets: [
      {
        label: "Productive Time",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "UnProductive Time",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(0, 0, 0, 1)",
      },
      {
        label: "Natural Time",
        data: [40, 35, 30, 28, 54, 50],
        borderColor: "rgba(0, 0, 255, 1)",
      },
    ],
  };

  return (
    <div className="max-sm:p-0" style={{ padding: "19px 26px" }}>
      <div className="flex justify-start items-center">
        <div className="dashboard_iconContainer">
          <MdDashboardCustomize size={20} className="attendance_icon" />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Dashboard
        </h2>
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

      <div className="grid grid-cols-3 gap-8 max-sm:grid-cols-1">
        <div className=" col-span-1 p-8 shadow-lg bg-white">
          <h3 className="mb-3">Today's Attendance</h3>
          <hr />
          <div className="mt-10">
            <DoughnutChart />
          </div>
        </div>
        <div className=" col-span-2 shadow-lg p-12 bg-white max-sm:p-0">
          <h3 className="mb-3 "> Attendance Trend</h3>
          <div className=" h-80">
            <hr />
            <LineChart
              data={lineData}
              displayFields={[
                "present",
                "absent",
                "attendance",
                "averageWorkingHours",
              ]}
              yOptions={{ type: "logarithmic", display: true }}
              y1Options={{ type: "linear", display: true, min: 0, max: 24 }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
        <div className="mt-8 col-span-1 shadow-lg p-1 bg-white max-sm:p-0">
          <h3 className="mb-3">Most Productive Team</h3>
          <div>
            <hr />
            <MyTable2 />
          </div>
        </div>
        <div className="mt-8 col-span-1 shadow-lg p-1 bg-white max-sm:p-0">
          <h3 className="mb-3">Most Active Team</h3>
          <div>
            <hr />
            <MyTable />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
        <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:w-full max-sm:p-0">
          <h3 className="mb-3">Activity Trend</h3>
          <div className=" h-72">
            <hr />
            <LineCharts data={lineData1} />
          </div>
        </div>
        <div className="mt-8 col-span-1 shadow-lg p-8 bg-white max-sm:grid-cols-1 max-sm:p-0">
          <h3 className="mb-3">Productivity Trend</h3>
          <div className="">
            <hr />
            <LineCharts data={lineData2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
