import React from "react";
import { Row, Col, Avatar } from "antd";
import { PiArrowDownLeftBold, PiArrowUpRightBold } from "react-icons/pi";
import "./styles.css";

const DateWiseAttendance = () => {
  const presentList = [
    { id: 1, name: "Balaji", checkIn: "09:12 AM", checkOut: "06:32 PM" },
    { id: 2, name: "Rohit", checkIn: "09:16 AM", checkOut: "06:34 PM" },
  ];
  const absentList = [
    { id: 1, name: "Divya", checkIn: "09:12 AM", checkOut: "06:32 PM" },
    { id: 2, name: "Preethi", checkIn: "09:16 AM", checkOut: "06:34 PM" },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="datewise_Container">
            <p className="datewise_presenttext">Present - 14</p>

            {presentList.map((item) => (
              <>
                <div className="datewise_presentlistContainer">
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <div className="presentlist_avatarContainer">
                        <Avatar
                          size={32}
                          style={{
                            backgroundColor: "#765eb4",
                            color: "#ffffff",
                          }}
                        >
                          {item.name[0]}
                        </Avatar>
                        <p className="datewise_presentlistnames">{item.name}</p>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      className="datewise_presentlist_rightContainer"
                    >
                      <div className="datewise_inouttimeContainer">
                        <PiArrowDownLeftBold size={20} color="#25a17d" />
                        <p className="datewise_checkintime">{item.checkIn}</p>
                      </div>
                      <div
                        className="datewise_inouttimeContainer"
                        style={{ marginLeft: "12px" }}
                      >
                        <PiArrowUpRightBold size={20} color="#e93b3a" />
                        <p className="datewise_checkintime">{item.checkOut}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <hr className="presentname_hrtag" />
              </>
            ))}
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="datewise_Container">
            <p className="datewise_absenttext">Absent - 10</p>

            {absentList.map((item) => (
              <>
                <div className="datewise_presentlistContainer">
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="presentlist_avatarContainer">
                        <Avatar
                          size={32}
                          style={{
                            backgroundColor: "#765eb4",
                            color: "#ffffff",
                          }}
                        >
                          {item.name[0]}
                        </Avatar>
                        <p className="datewise_presentlistnames">{item.name}</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <hr className="presentname_hrtag" />
              </>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DateWiseAttendance;
