import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Avatar } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { MdScreenshotMonitor } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import Screenshot1 from "../../assets/images/Screenshot 2024-07-05 125005.png";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { MdOutlineFileDownload } from "react-icons/md";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";
import CommonAvatar from "../Common/CommonAvatar";

const Field = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [
    {
      id: 1,
      name: "Operation",
    },
  ];
  const userList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Karthick" },
  ];
  const data = [
    {
      employee: "Balaji R",
      key: "1",
    },
    {
      employee: "Vignesh T",
      key: "2",
    },
    {
      employee: "Goutham D",
      key: "3",
    },
    {
      employee: "Rocky D",
      key: "4",
    },
    {
      employee: "Velu S",
      key: "5",
    },
    {
      employee: "Muthu K",
      key: "6",
    },
    {
      employee: "Nandha B",
      key: "7",
    },
    {
      employee: "Vijay S",
      key: "8",
    },
    {
      employee: "Swetha A",
      key: "9",
    },
    {
      employee: "Kishore W",
      key: "10",
    },
    {
      employee: "Divya A",
      key: "11",
    },
    {
      employee: "Abi Q",
      key: "12",
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
          <GrMapLocation size={20} />
        </div>
        <h2 className="allpage_mainheadings">Field</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
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
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="field_calendarContainer">
            <div style={{ marginRight: "12px" }}>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <CommonDoubleDatePicker />
            <Tooltip placement="top" title="Download">
              <Button
                className="dashboard_download_button"
                // onClick={() => {
                //   DownloadTableAsXLSX(data, columns, "alerts.xlsx");
                // }}
              >
                <DownloadOutlined className="download_icon" />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={7} lg={7} style={{ height: "75vh" }}>
          <div className="screenshots_usersmainContainer">
            <div className="screenshots_userlistheaderContainer">
              <p className="screenshots_userheading">Punched In Users</p>
            </div>

            <hr className="screenshot_userhrtag" />
            <div className="screenshots_usersnamemainContainer">
              {data.map((item) => {
                return (
                  <>
                    <div className="screenshots_usersnameContainer">
                      <CommonAvatar itemName={item.employee} />
                      <p>{item.employee}</p>
                    </div>
                    <hr className="screenshot_users_hrtag" />
                  </>
                );
              })}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={17} lg={17} style={{ height: "auto" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d64128957.5739181!2d79.44681508403109!3d11.178679955030265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1708326411006!5m2!1sen!2sin"
            className="w-full"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            title="map"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </div>
  );
};

export default Field;
