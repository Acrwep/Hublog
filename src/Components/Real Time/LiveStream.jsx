import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Avatar } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { CiStreamOn } from "react-icons/ci";
import ChromeLogo from "../../assets/images/chromeicon.png";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import CommonAvatar from "../Common/CommonAvatar";
import { LuClock3 } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

const LiveStream = () => {
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
      id: 1,
      employee: "Balaji R",
      email: "balaji@gmail.com",
    },
    {
      id: 2,
      employee: "Vignesh R",
      email: "vignesh@gmail.com",
    },
    {
      id: 3,
      employee: "Goutham K",
      email: "goutham@gmail.com",
    },
    {
      id: 4,
      employee: "Rocky D",
      email: "rocky@gmail.com",
    },
    {
      id: 5,
      employee: "Velu S",
      email: "velu@gmail.com",
    },
    {
      id: 6,
      employee: "Muthu K",
      email: "muthu@gmail.com",
    },
    {
      id: 7,
      employee: "Nandha B",
      email: "nandha@gmail.com",
    },
    {
      id: 8,
      employee: "Vijay S",
      email: "vicky@gmail.com",
    },
    {
      id: 9,
      employee: "Swetha A",
      email: "swetha@gmail.com",
    },
    {
      id: 10,
      employee: "Kishore W",
      email: "kishore@gmail.com",
    },
    {
      id: 11,
      employee: "Divya A",
      email: "divya@gmail.com",
    },
    {
      id: 12,
      employee: "Abi Q",
      email: "abi@gmail.com",
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
          <CiStreamOn size={20} />
        </div>
        <h2 className="allpage_mainheadings">Livestream</h2>
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
            <Tooltip placement="top" title="Refresh">
              <Button className="dashboard_refresh_button">
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        {data.map((item) => (
          <Col xs={24} sm={24} md={8} lg={8} style={{ marginBottom: "20px" }}>
            <div className="livestream_cards">
              <div className="livestreamcard_contentContainer">
                <div style={{ display: "flex" }}>
                  <CommonAvatar
                    itemName={item.employee}
                    avatarSize={39}
                    avatarfontSize="17px"
                  />
                  <div>
                    <p className="livestream_username">{item.employee}</p>
                    <p className="livestream_useremail">{item.email}</p>
                  </div>
                </div>

                <div style={{ display: "flex", marginTop: "12px" }}>
                  <img src={ChromeLogo} className="livestream_logos" />
                  <div>
                    <p className="livestream_websitename">Chrome</p>
                    <p className="livestream_websiteurl">
                      https://acte.we360.ai/livestream
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className="livestream_clockContainer">
                    <LuClock3 size={16} style={{ marginRight: "12px" }} />
                    <p className="livestream_websiteurl">9 minutes ago</p>
                  </div>
                </div>
              </div>

              <div className="livestream_viewContainer">
                <FaEye color="#000000" size={27} className="download_icon" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LiveStream;
