import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, DatePicker } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import moment from "moment";
import CommonAvatar from "../Common/CommonAvatar";
import { dayJs } from "../Utils";

const MonthlyInandOutReport = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(dayJs());
  const teamList = [{ id: 1, name: "Operation" }];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const getCurrentMonthDates = () => {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");
    const dates = [];

    let current = startOfMonth;
    while (current <= endOfMonth) {
      dates.push(current.format("DD"));
      current = current.add(1, "days");
    }

    return dates;
  };

  // Generate columns
  const generateColumns = () => {
    const currentMonthDates = getCurrentMonthDates();

    const dateColumns = currentMonthDates.map((date) => ({
      title: date,
      dataIndex: date,
      key: date,
      border: "1px solid gray",
      className: "target-column-class",
      children: [
        {
          title: (
            <div
              style={{
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              In
            </div>
          ),
          dataIndex: `${date}_in`,
          key: `${date}_in`,
          width: 100,
          render: (record) => {
            if (record === "weeklyoff") {
              return {
                props: {
                  style: {
                    background: "rgb(211 47 47 / 27%)",
                    borderRight: "none",
                    borderBottom: "1.7px solid white",
                    position: "relative",
                  },
                },
                children: (
                  <div>
                    <p className="monthlyweeklyoff_text">Weekly Off</p>
                  </div>
                ),
              };
            } else if (record === undefined) {
              return;
            } else {
              return {
                props: {
                  style: {
                    background:
                      record === "weeklyoff"
                        ? "rgb(211 47 47 / 27%)"
                        : record === ""
                        ? "white"
                        : "rgb(20 184 166 / 20%)",
                    borderRight: "1px solid #d5d1d1",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    <p className="monthlyInOuttime_text">{record}</p>
                  </div>
                ),
              };
            }
          },
        },
        {
          title: (
            <div style={{ textAlign: "center", fontWeight: "400" }}>Out</div>
          ),
          dataIndex: `${date}_out`,
          key: `${date}_out`,
          width: 100,
          render: (record) => {
            if (record === "weeklyoff") {
              return {
                props: {
                  style: {
                    background: "rgb(211 47 47 / 27%)",
                    borderRight: "none",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    {/* <p className="monthlyInOuttime_text">{record}</p> */}
                  </div>
                ),
              };
            } else if (record === undefined) {
              return;
            } else {
              return {
                props: {
                  style: {
                    background: "rgb(20 184 166 / 20%)",
                    borderRight: "1px solid #d5d1d1",
                    borderBottom: "1.7px solid white",
                  },
                },
                children: (
                  <div>
                    <p className="monthlyInOuttime_text">{record}</p>
                  </div>
                ),
              };
            }
          },
        },
      ],
    }));

    return [
      {
        title: "Employee",
        dataIndex: "employee",
        key: "employee",
        width: "170px",
        fixed: "left",
        render: (text, record) => {
          return (
            <div className="breakreport_employeenameContainer">
              <CommonAvatar itemName={record.employee} />
              <p className="reports_avatarname">{record.employee}</p>
            </div>
          );
        },
      },
      ...dateColumns,
    ];
  };

  const columns = generateColumns();

  // Sample data
  const data = [
    {
      key: "1",
      employee: "John Doe",
      "01_in": "09:20 AM",
      "01_out": "06:30 PM",
      "02_in": "weeklyoff",
      "02_out": "weeklyoff",
    },
    {
      key: "2",
      employee: "Maxy",
      "01_in": "09:14 AM",
      "01_out": "06:40 PM",
      "02_in": "weeklyoff",
      "02_out": "weeklyoff",
    },
    // Add more data as necessary
  ];
  const onDateChange = (date, dateString) => {
    // Log the date and formatted date string
    console.log(date, dateString);
    setDate(date);
    // If a date is selected, format it to get the month name and log it
    if (date) {
      const monthName = date.format("MMMM");
      console.log("Selected Month:", monthName);
    }
  };

  // Function to get the formatted month name from the date
  const getMonthName = (date) => {
    if (date) {
      return date.format("MMMM");
    }
    return "";
  };

  const disabledDate = (current) => {
    // Disable all future dates
    return current && current > dayJs().endOf("month");
  };

  const handleSelectedDatas = (value) => {
    console.log("Selected Rows", value);
    const Ids = value.map((item) => {
      return item.key;
    });
    console.log("Selected Ids", Ids);
  };
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div
        className="dailyreports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Monthly In-Out Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField options={teamList} placeholder="All Teams" />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField options={userList} placeholder="Select User" />
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          {/* <CommonDatePicker onChange={onDateChange} value={date} month="true" /> */}
          <DatePicker
            picker="month"
            onChange={onDateChange}
            value={date}
            format={getMonthName}
            disabledDate={disabledDate}
          />
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsXLSX(data, columns, "alerts.xlsx");
              }}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button className="dashboard_refresh_button">
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          dataPerPage={4}
          bordered="true"
          checkBox="false"
        />
      </div>
    </div>
  );
};

export default MonthlyInandOutReport;
