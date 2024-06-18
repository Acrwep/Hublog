import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import { FiUser, FiCoffee } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { SiWorkplace } from "react-icons/si";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuGoal, LuUsers } from "react-icons/lu";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserAttendance from "./UserAttendance";
import "./styles.css";
import UserBreak from "./UserBreak";
import UserWellness from "./UserWellness";
import UserProductivity from "./UserProductivity";
import UserActivity from "./UserActivity";
import UserAppsUrls from "./UserApps&Urls";
import CommonSelectField from "../../components/Common/CommonSelectField";
import CommonDoubleDatePicker from "../../components/Common/CommonDoubleDatePicker";

const UserDetail = () => {
  const usermenuList = [
    {
      id: 1,
      name: "Attendance",
      icon: <FiUser size={21} />,
    },
    { id: 2, name: "Breaks", icon: <LuUsers size={21} /> },
    { id: 3, name: "Wellness", icon: <MdAccessTime size={21} /> },
    { id: 4, name: "Productivity", icon: <MdAccessTime size={21} /> },
    { id: 5, name: "Activity", icon: <FiCoffee size={21} /> },
    { id: 6, name: "Apps & URLs", icon: <IoRocketOutline size={21} /> },
  ];
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (id) => {
    setActivePage(id === activePage ? activePage : id);
  };

  const usersList = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Rubi" },
  ];
  return (
    <div>
      <div className="settings_headingContainer">
        <div className="userdetail_iconContainer">
          <FaUserLarge size={19} />
        </div>
        <h2 className="text-xl font-bold ml-4" style={{ fontSize: "22px" }}>
          User Detail{" "}
          {activePage === 1
            ? "> Attendance"
            : activePage === 2
            ? "> Breaks"
            : activePage === 3
            ? "> Wellness"
            : activePage === 4
            ? "> Productivity"
            : activePage === 5
            ? "> Activity"
            : activePage === 6
            ? "> Apps & URLs"
            : ""}
        </h2>
      </div>
      <div className="userdetail_userselectContainer">
        <Row>
          <Col xs={24} sm={24} md={24} lg={12}>
            <CommonSelectField
              placeholder="Select Users"
              options={usersList}
              style={{ width: "190px" }}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "6px",
            }}
          >
            <CommonDoubleDatePicker />
          </Col>
        </Row>
      </div>

      <Row className="settings_rowcontainer">
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={6}
          className="settinglist_columnOneContainer"
        >
          <div className="userdetail_profileContainer">
            <Avatar className="userdetail_avatar" icon={<UserOutlined />} />
            <div style={{ flexDirection: "column", padding: "12px" }}>
              <p className="userdetail_username">Balaji</p>
              <p>balaji@gmail.com</p>
            </div>
          </div>
          <div className="settings_sidebarContainer">
            {usermenuList.map((item) => (
              <div
                className={
                  item.id === activePage
                    ? "settings_activelistContainer"
                    : "settings_inactivelistContainer"
                }
                onClick={() => handlePageChange(item.id)}
              >
                {item.icon}
                <p
                  className={
                    item.id === activePage ? "" : "settings_inactivelisttext"
                  }
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={16}
          lg={18}
          className="settinglist_columnContainer"
        >
          {activePage === 1 && (
            <div>
              <UserAttendance />
            </div>
          )}
          {activePage === 2 && (
            <div>
              <UserBreak />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <UserWellness />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <UserProductivity />
            </div>
          )}
          {activePage === 5 && (
            <div>
              <UserActivity />
            </div>
          )}
          {activePage === 6 && (
            <div>
              <UserAppsUrls />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserDetail;
