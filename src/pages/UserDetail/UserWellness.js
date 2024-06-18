import React, { useState } from "react";
import { Col, Row, Table } from "antd";
import ReactApexChart from "react-apexcharts";
import "./styles.css";
import CommonMonthlyCalendar from "../../components/Common/CommonMonthlyCalendar";

export default function UserWellness() {
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    {
      title: "Total Present",
      dataIndex: "totalpresent",
      key: "date",
      width: 100,
    },
    { title: "Healthy", dataIndex: "healthy", key: "in", width: 100 },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "out",
      width: 100,
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
    {
      key: "2",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
    {
      key: "3",
      totalpresent: 5,
      healthy: 4,
      overburdened: 0,
    },
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 2,
    total: dummydatas.length,
    onChange: handlePageChange,
  };

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Present", "Absent"],
    colors: ["#25a17d", "#7A7D7C"], // Blue and Gray colors
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
              fontWeight: 600, // Increase font weight
              fontSize: "19px",
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              fontWeight: 700, // Increase font weight
              formatter: function (val) {
                return val; // Display value in the tooltip
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
          return val; // Display value in the tooltip
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
  const presentCount = 30;
  const absentCount = 20;
  const series = [presentCount, absentCount];

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
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="userdetail_calendarContainer">
            <p className="userattendance_heading">Attendance</p>
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={270}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="userdetail_calendarsContainer">
            <p className="userattendance_heading">Monthly Attendance</p>
            <CommonMonthlyCalendar />
          </div>
        </Col>
      </Row>

      <div className="userattendancetable_Container">
        <p style={{ fontWeight: 600, fontSize: "17px" }}>Detail</p>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dummydatas}
          scroll={{ x: 600 }} // Enable horizontal scrolling
          pagination={paginationConfig}
          tableLayout="fixed" // Ensures the table layout is fixed
        />
      </div>
    </div>
  );
}
