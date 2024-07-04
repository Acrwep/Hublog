import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip, Avatar } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import DownloadTableAsXLSX from "../Common/DownloadTableAsXLSX";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";

const BreakReports = () => {
  const navigation = useNavigate();
  const [date, setDate] = useState(new Date());
  const teamList = [{ id: 1, name: "Operation" }];
  const data = [
    {
      employee: "Balaji",
      key: "1",
      breaktype: "Lunch",
      breakstart: "01:00 PM",
      breakend: "01:45 PM",
    },
    {
      employee: "Vignesh",
      key: "2",
      breaktype: "Morning Break",
      breakstart: "11:00 AM",
      breakend: "11:20 AM",
    },
    {
      employee: "Goutham",
      key: "3",
      breaktype: "Evening Break",
      breakstart: "04:00 PM",
      breakend: "04:20 PM",
    },
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      width: "150px",
      render: (text, record) => {
        const getInitials = (fullName) => {
          const nameArray = fullName.split(" ");
          if (nameArray.length >= 2) {
            const firstLetter = nameArray[0].charAt(0);
            const secondLetter = nameArray[1].charAt(0);
            return `${firstLetter}${secondLetter}`;
          } else {
            return fullName.charAt(0); // Use the first letter if no space is found
          }
        };

        const getColorForName = (name) => {
          // You can implement your own logic here to generate colors based on the name.
          // For simplicity, we'll use a random color for demonstration purposes.
          const colors = [
            "#DBA6D1",
            "#A6DBC1",
            "#A6AADB",
            "#D6DBA6",
            "#8ED1FC",
            "#EEB39C",
            "#CDB2FD",
          ];
          const nameHash = name
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
          return colors[nameHash % colors.length];
        };
        const nameColors = getColorForName(record.employee);

        // Function to calculate a contrasting text color
        const getVeryDarkTextColor = (backgroundColor) => {
          // You can adjust the subtraction value to make the text color darker or lighter.
          const subtractionValue = 120; // Adjust as needed
          const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
          const match = backgroundColor.match(HEX_REGEX);
          if (match) {
            const r = Math.max(0, parseInt(match[1], 16) - subtractionValue);
            const g = Math.max(0, parseInt(match[2], 16) - subtractionValue);
            const b = Math.max(0, parseInt(match[3], 16) - subtractionValue);
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
          }
          return backgroundColor;
        };

        const veryDarkTextColor = getVeryDarkTextColor(nameColors);

        return (
          <div className="breakreport_employeenameContainer">
            <Avatar
              size={32}
              className="temmember_nameavatar"
              style={{
                backgroundColor: nameColors,
                marginRight: "16px",
                color: veryDarkTextColor,
                fontWeight: "600",
              }}
            >
              {getInitials(record.employee)}
            </Avatar>
            <p>{record.employee}</p>
          </div>
        );
      },
    },
    {
      title: "Break type",
      dataIndex: "breaktype",
      key: "breaktype",
      width: "150px",
    },
    {
      title: "Break start",
      dataIndex: "breakstart",
      key: "breakstart",
      width: "150px",
    },
    {
      title: "Break end",
      dataIndex: "breakend",
      key: "breakend",
      width: "150px",
    },
  ];

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
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
        className="reports_backContainer"
        onClick={() => navigation("/reports")}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Break Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <CommonSelectField
            options={teamList}
            placeholder="All Teams"
            style={{ width: "170px" }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          <CommonDatePicker onChange={onDateChange} value={date} />
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
      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
    </div>
  );
};

export default BreakReports;
