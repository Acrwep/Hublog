import React, { useState } from "react";
import { Row, Col, Table } from "antd";
import ReactApexChart from "react-apexcharts";
import "./styles.css";

export default function UserProductivity() {
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      width: 100,
    },
    {
      title: "Online time",
      dataIndex: "onlinetime",
      key: "onlinetime",
      width: 120,
    },
    {
      title: "Productive Time",
      dataIndex: "productivetime",
      key: "productivetime",
      width: 120,
    },
    {
      title: "Unproductive Time",
      dataIndex: "unproductivetime",
      key: "unproductivetime",
      width: 120,
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
    {
      key: "2",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
    {
      key: "3",
      attendance: "6",
      onlinetime: "27h:47m:27s",
      productivetime: "17h:51m:34s",
      unproductivetime: "00h:00m:00s",
    },
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 10,
    total: dummydatas.length,
    onChange: handlePageChange,
  };

  const convertTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map((time) => parseInt(time));
    return hours * 60 + minutes;
  };

  // Convert total minutes back to hours and minutes
  const convertMinutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h:${minutes}m`;
  };

  const ProductiveTime = "17h:51m";
  const UnproductiveTime = "01h:01m";

  const productiveTimeInMinutes = convertTimeToMinutes(ProductiveTime);
  const unproductiveTimeInMinutes = convertTimeToMinutes(UnproductiveTime);
  const totalTimeInMinutes =
    productiveTimeInMinutes + unproductiveTimeInMinutes;
  const totalTimeFormatted = convertMinutesToTime(totalTimeInMinutes);

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Productive time", "Unproductive time"],
    colors: ["#25a17d", "#7A7D7C"], // Green and Gray colors
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
              formatter: function () {
                return totalTimeFormatted;
              },
              style: {
                fontWeight: 600, // Increase font weight
                fontSize: "19px",
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          const hours = Math.floor(val / 60);
          const minutes = val % 60;
          return `${hours}h:${minutes}m`;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  const series = [productiveTimeInMinutes, unproductiveTimeInMinutes];

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

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Application</p>
            <p className="userproductivity_contents">Chrome</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userproductivity_topContainers">
            <p>Top Urls</p>
            <p className="userproductivity_contents">https://ads.google.com/</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <div className="userproductivity_topContainers">
            <p>Top Category</p>
            <p className="userproductivity_contents">Internet</p>
            <p className="userproductivity_hours">14h:47m</p>
          </div>
        </Col>
      </Row>

      <div className="userproductivity_chartContainer">
        <p className="userproductivity_chartheading">Productivity Breakdown</p>
        <div
          style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}
        >
          <div style={{ flexDirection: "column" }}>
            <p>Total productive time</p>
            <p style={{ fontWeight: "600", fontSize: "19px" }}>17h 51m</p>
            <p>For the last 7 days</p>
          </div>

          <div style={{ flexDirection: "column", marginLeft: "20px" }}>
            <p>Average productive time</p>
            <p style={{ fontWeight: "600", fontSize: "19px" }}>2h 51m</p>
            <p>Average per day</p>
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={320}
        />
      </div>

      <div className="userattendancetable_Container">
        <p style={{ fontWeight: 600, fontSize: "17px" }}>Detail</p>
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
