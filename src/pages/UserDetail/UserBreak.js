import React, { useState } from "react";
import { Table } from "antd";
import ReactApexChart from "react-apexcharts";
import "./styles.css";

export default function UserBreak() {
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    { title: "Date", dataIndex: "date", key: "date", width: 160 },
    {
      title: "Break Type",
      dataIndex: "breaktype",
      key: "breaktype",
      width: 170,
    },
    {
      title: "Break Start",
      dataIndex: "breakstart",
      key: "breakstart",
      width: 170,
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      date: "2024-06-17",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Lunch Break",
      breakstart: "01:00 PM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
    {
      key: "1",
      date: "2024-06-17",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Lunch Break",
      breakstart: "01:00 PM",
    },
    {
      key: "2",
      date: "2024-06-17",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
    },
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 4,
    total: dummydatas.length,
    onChange: handlePageChange,
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const datas = {
    series: [
      {
        name: "Active Time",
        data: [65, 59, 80, 81, 56, 55],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: [
          "2024-02-01",
          "2024-02-02",
          "2024-02-03",
          "2024-02-04",
          "2024-02-05",
          "2024-02-06",
        ],
        title: {
          text: "",
        },
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: "Time (hours)",
        },
        forceNiceScale: true,
      },
      colors: ["#25a17d", "#F44336"], // Blue for Active Time, Red for Idle Time
      legend: {
        position: "top",
      },
    },
  };
  return (
    <div>
      <div className="userbreak_linechartContainer">
        <ReactApexChart
          options={datas.options}
          series={datas.series}
          type="line"
          height={300}
        />
      </div>

      <div className="userbreaktable_Container">
        <p style={{ fontWeight: 600, fontSize: "17px", marginBottom: "10px" }}>
          Detail
        </p>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dummydatas}
          scroll={{ x: 700 }} // Enable horizontal scrolling
          pagination={paginationConfig}
          tableLayout="fixed" // Ensures the table layout is fixed
        />
      </div>
    </div>
  );
}
