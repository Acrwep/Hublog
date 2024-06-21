import React, { useState, useEffect } from "react";
import { BiSolidBell } from "react-icons/bi";
import { Button, Tooltip } from "antd";
import CommonDatePicker from "../components/Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../components/Common/CommonTable";
import "./styles.css";

const Alert = () => {
  const [date, setDate] = useState(new Date());
  const data = [
    {
      data: "1",
      key: "1",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "2",
      key: "2",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "3",
      key: "4",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
    {
      data: "4",
      key: "5",
      alertdescription: "lyuhj",
      alerttype: "Morning Break",
      triggeredfor: "hkj",
      triggeredtime: "11:30",
    },
  ];

  const columns = [
    { title: "Data", dataIndex: "data", key: "data", width: "150px" },
    {
      title: "Alert Description",
      dataIndex: "alertdescription",
      key: "data",
      width: "150px",
    },
    {
      title: "Alert Type",
      dataIndex: "alerttype",
      key: "data",
      width: "150px",
    },
    {
      title: "Triggered for",
      dataIndex: "triggeredfor",
      key: "data",
      width: "150px",
    },
    {
      title: "Triggered time",
      dataIndex: "triggeredtime",
      key: "data",
      width: "150px",
    },
  ];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
  };

  return (
    <div className="alerts_mainContainer">
      <div className="flex">
        <div className="userdetail_iconContainer">
          <BiSolidBell size={22} />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          Alerts
        </h2>
      </div>

      <div className="flex justify-between items-center w-full mb-2 max-sm:flex-col max-sm:w-full">
        <div className="flex justify-end items-center h-20 w-full max-sm:flex-col">
          <div>
            <CommonDatePicker onChange={onDateChange} value={date} />
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

      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
    </div>
  );
};

export default Alert;
