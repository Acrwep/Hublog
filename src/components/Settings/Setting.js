import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import UserandDesignation from "./usersandDesignation/UsersandDesignation";
import { FiUser, FiCoffee } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { SiWorkplace } from "react-icons/si";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuGoal, LuUsers } from "react-icons/lu";
import { VscShield } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { Row, Col } from "antd";
import Team from "./team/Team";
import Role from "./Role/Role";
import Workplace from "./Workplace";
import Goals from "./Goals/Goals";
import Compliance from "./Compliance/Compliance";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import Break from "./Break/Break";
import { getDesignation, getTeams, getUsers } from "../APIservice.js/action";
import AlertRules from "./AlertRules/AlertRules";
import { storeDesignation, storeTeams, storeUsers } from "../Redux/slice";
import { CommonToaster } from "../Common/CommonToaster";

const Settings = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const settingsList = [
    {
      id: 1,
      name: "Users & Designations",
      icon: <FiUser size={21} />,
    },
    { id: 2, name: "Teams", icon: <LuUsers size={21} /> },
    { id: 3, name: "Roles", icon: <MdAccessTime size={21} /> },
    { id: 4, name: "Workplace", icon: <SiWorkplace size={21} /> },
    { id: 5, name: "Shifts", icon: <MdAccessTime size={21} /> },
    { id: 6, name: "Breaks", icon: <FiCoffee size={21} /> },
    { id: 7, name: "Productivity Rules", icon: <IoRocketOutline size={21} /> },
    { id: 8, name: "Alert Rules", icon: <HiOutlineBellAlert size={21} /> },
    { id: 9, name: "Email Reports", icon: <HiOutlineMail size={21} /> },
    { id: 10, name: "Goals", icon: <LuGoal size={21} /> },
    { id: 11, name: "Compliance", icon: <VscShield size={21} /> },
  ];
  const [activePage, setActivePage] = useState(1);
  const [userPageVisited, setUserPageVisited] = useState(false);

  const handlePageChange = (id) => {
    setActivePage(id === activePage ? activePage : id);
  };

  useEffect(() => {
    if (userPageVisited === false) {
      getUsersData();
    }
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      console.log("users response", response.data);
      const usersList = response.data;
      dispatch(storeUsers(usersList));
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getDesignationData();
        setUserPageVisited(true);
      }, 1000);
    }
  };

  const getDesignationData = async () => {
    try {
      const response = await getDesignation();
      console.log("Designation response", response.data);
      const designationList = response.data;
      dispatch(storeDesignation(designationList));
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getTeamData();
      }, 1000);
    }
  };

  const getTeamData = async () => {
    try {
      const response = await getTeams(1);
      console.log("teamsssssss response", response.data);
      const teamList = response.data;
      dispatch(storeTeams(teamList));
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <IoMdSettings size={20} />
        </div>
        <h2 className="allpage_mainheadings">
          Settings{" "}
          {activePage === 1
            ? "> Users & Designation"
            : activePage === 2
            ? "> Teams"
            : activePage === 2
            ? "> Teams"
            : activePage === 3
            ? "> Roles"
            : activePage === 4
            ? "> Workplace"
            : activePage === 5
            ? "> Shifts"
            : activePage === 6
            ? "> Breaks"
            : activePage === 7
            ? "> Productivity Rules"
            : activePage === 8
            ? "> Alert Rules"
            : activePage === 9
            ? "> Email Reports"
            : activePage === 10
            ? "> Goals"
            : activePage === 11
            ? "> Compliance"
            : ""}
        </h2>
      </div>
      <Row className="settings_rowcontainer">
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={6}
          className="settinglist_columnOneContainer"
        >
          <div className="settings_sidebarContainer">
            {settingsList.map((item) => (
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
              <UserandDesignation loading={loading} />
            </div>
          )}
          {activePage === 2 && (
            <div>
              <Team loading={loading} />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <Role />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <Workplace />
            </div>
          )}
          {activePage === 6 && (
            <div>
              <Break />
            </div>
          )}
          {activePage === 8 && (
            <div>
              <AlertRules />
            </div>
          )}
          {activePage === 10 && (
            <div>
              <Goals />
            </div>
          )}
          {activePage === 11 && (
            <div>
              <Compliance />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
