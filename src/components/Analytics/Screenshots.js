import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tooltip, Avatar } from "antd";
import CommonDatePicker from "../Common/CommonDatePicker";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import { MdScreenshotMonitor } from "react-icons/md";
import Screenshot1 from "../../assets/images/Screenshot 2024-07-05 125005.png";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { MdOutlineFileDownload } from "react-icons/md";

const Screenshots = () => {
  const [date, setDate] = useState(new Date());

  const teamList = [
    {
      id: 1,
      name: "Operation",
    },
  ];
  const data = [
    {
      employee: "Balaji",
      key: "1",
    },
    {
      employee: "Vignesh",
      key: "2",
    },
    {
      employee: "Goutham",
      key: "3",
    },
    {
      employee: "Rocky",
      key: "4",
    },
    {
      employee: "Velu",
      key: "5",
    },
    {
      employee: "Muthu",
      key: "6",
    },
    {
      employee: "Nandha",
      key: "7",
    },
    {
      employee: "Vijay",
      key: "8",
    },
    {
      employee: "Swetha",
      key: "9",
    },
    {
      employee: "Kishore",
      key: "10",
    },
    {
      employee: "Divya",
      key: "11",
    },
    {
      employee: "Abi",
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
          <MdScreenshotMonitor size={20} />
        </div>
        <h2 className="allpage_mainheadings">Screenshots</h2>
      </div>

      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ width: "170px" }}>
            <CommonSelectField options={teamList} placeholder="All Teams" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
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
        <Col xs={24} sm={24} md={8} lg={8} style={{ height: "75vh" }}>
          <div className="screenshots_usersmainContainer">
            <div className="screenshots_userlistheaderContainer">
              <p className="screenshots_userheading">Users</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <p className="screenshots_userheading">Total:30</p>
              </div>
            </div>

            <hr className="screenshot_userhrtag" />
            <div className="screenshots_usersnamemainContainer">
              {data.map((item) => {
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
                const nameColors = getColorForName(item.employee);

                // Function to calculate a contrasting text color
                const getVeryDarkTextColor = (backgroundColor) => {
                  // You can adjust the subtraction value to make the text color darker or lighter.
                  const subtractionValue = 120; // Adjust as needed
                  const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                  const match = backgroundColor.match(HEX_REGEX);
                  if (match) {
                    const r = Math.max(
                      0,
                      parseInt(match[1], 16) - subtractionValue
                    );
                    const g = Math.max(
                      0,
                      parseInt(match[2], 16) - subtractionValue
                    );
                    const b = Math.max(
                      0,
                      parseInt(match[3], 16) - subtractionValue
                    );
                    return `#${r.toString(16)}${g.toString(16)}${b.toString(
                      16
                    )}`;
                  }
                  return backgroundColor;
                };

                const veryDarkTextColor = getVeryDarkTextColor(nameColors);
                return (
                  <>
                    <div className="screenshots_usersnameContainer">
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
                        {getInitials(item.employee)}
                      </Avatar>
                      <p>{item.employee}</p>
                    </div>
                    <hr className="screenshot_users_hrtag" />
                  </>
                );
              })}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} style={{ height: "auto" }}>
          <div className="screenshots_imagesContainer">
            <Row
              gutter={30}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <Col xs={24} sm={24} md={12} lg={12}>
                <div style={{ display: "flex" }}>
                  <a href={Screenshot1} download="Screenshot1.png">
                    <img
                      src={Screenshot1}
                      className="screenshot_images"
                      alt="Screenshot"
                    />
                  </a>
                  <div className="screenshotimage_buttonmainContainer">
                    <div className="screenshotimage_buttonContainer">
                      <MdOutlineFileDownload size={24} />
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <div style={{ display: "flex" }}>
                  <a href={Screenshot1} download="Screenshot2.png">
                    <img
                      src={Screenshot1}
                      className="screenshot_images"
                      alt="Screenshot"
                    />
                  </a>
                  <div className="screenshotimage_buttonmainContainer">
                    <div className="screenshotimage_buttonContainer">
                      <MdOutlineFileDownload size={24} />
                    </div>
                  </div>
                </div>{" "}
              </Col>
            </Row>
            {/* <p className="screenshots_nodatafound">No data found</p> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Screenshots;
