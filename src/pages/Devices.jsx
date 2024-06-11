import React from "react";
import { MdOutlineDevicesOther } from "react-icons/md";
import Dropdown from "../components/dropdown/Dropdown";
import { MdRefresh } from "react-icons/md";
import DoughnutChart from "../components/chart/DoughnutChart";
import { AntTable } from "../components/table/Table";

const Devices = () => {
  const doughnutData = {
    labels: ["Present", "Absent"],
    datasets: [{ data: [75, 25] }],
  };

  const data = [
    {
      key: 1,
      employee: "Alice",
      devicename: "ACTE",
      deviceid: "76c45031-bc0e-4a6a-8513-4ffab1aa8012",
      platform: "WINDOWS",
      osname: "Windows 10 Version 2009",
      osbuild: "10",
      systemtype: "x86_64",
      ip: "2405:201:e004:3890:-3d52:12c6:ef21:c20d",
      apptype: "standard",
      myzenversion: "2.7.4",
    },
    {
      key: 2,
      employee: "Alice",
      devicename: "ACTE",
      deviceid: "76c45031-bc0e-4a6a-8513-4ffab1aa8012",
      platform: "WINDOWS",
      osname: "Windows 10 Version 2009",
      osbuild: "10",
      systemtype: "x86_64",
      ip: "2405:201:e004:3890:-3d52:12c6:ef21:c20d",
      apptype: "standard",
      myzenversion: "2.7.4",
    },
    // More data...
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.employee - b.employee,
    },
    {
      title: "Device Name",
      dataIndex: "devicename",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.devicename - b.devicename,
    },
    {
      title: "Device ID",
      dataIndex: "deviceid",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.deviceid - b.deviceid,
      width: 180,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.platform - b.platform,
    },
    {
      title: "OS Name",
      dataIndex: "osname",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.osname - b.osname,
    },
    {
      title: "OS Build",
      dataIndex: "osbuild",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.osbuild - b.osbuild,
    },
    {
      title: "System Type",
      dataIndex: "systemtype",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.systemtype - b.systemtype,
    },
    {
      title: "IP",
      dataIndex: "ip",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.ip - b.ip,
      width: 150,
    },
    {
      title: "App Type",
      dataIndex: "apptype",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.apptype - b.apptype,
    },
    {
      title: "MyZen version",
      dataIndex: "myzenversion",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.myzenversion - b.myzenversion,
    },
  ];
  return (
    <div className="p-8 max-sm:p-0">
      <div className="flex justify-start items-center">
        <MdOutlineDevicesOther className="text-2xl text-blue-600" />
        <h2 className="text-xl font-bold ml-2">Devices</h2>
      </div>
      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div>
          <Dropdown />
        </div>
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <button className="text-blue-500 p-1 border border-black rounded-md">
              <MdRefresh />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className=" col-span-1 shadow-lg p-5">
          <h5 className="mb-3">Overall Wellness</h5>
          <hr />
          <div className="flex justify-between">
            <div>
              <DoughnutChart data={doughnutData} />
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-2">
              <div className="flex items-center">
                <div className=" w-2 h-6 bg-blue-600 rounded-lg m-2"></div>30
              </div>
              <div className="flex items-center ">
                <div className=" w-2 h-6 bg-gray-600 rounded-lg m-2"></div>20
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1 shadow-lg p-5">
          <h5 className="mb-3">Overall Wellness</h5>
          <hr />
          <div className="flex justify-between items-center">
            <div>
              <DoughnutChart data={doughnutData} />
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-2">
              <div className="flex items-center">
                <div className=" w-2 h-6 bg-blue-600 rounded-lg m-2"></div>30
              </div>
              <div className="flex items-center ">
                <div className=" w-2 h-6 bg-gray-600 rounded-lg m-2"></div>20
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" shadow-lg mt-3 p-5">
        <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
        <div className=" overflow-x-auto">
          <AntTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Devices;
