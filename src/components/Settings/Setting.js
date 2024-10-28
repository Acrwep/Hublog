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
import {
  getBreak,
  getCategories,
  getDesignation,
  getRole,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import AlertRules from "./AlertRules/AlertRules";
import {
  addteamMembers,
  storeActiveDesignation,
  storeActiveTeam,
  storeBreakSearchValue,
  storeCategories,
  storeDesignation,
  storeDesignationCount,
  storeDesignationSearchValue,
  storeRole,
  storeRoleSearchValue,
  storesettingsBreak,
  storeTeams,
  storeUsers,
  storeUsersCount,
  storeUserSearchValue,
  storeUsersForTeamsTab,
} from "../Redux/slice";
import { CommonToaster } from "../Common/CommonToaster";
import ProductivityRules from "./ProductivityRules/ProductivityRules";

const Settings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
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
  const [rolePageVisited, setRolePageVisited] = useState(false);
  const [breakPageVisited, setBreakPageVisited] = useState(false);
  const [productivityRulesLoading, setProductivityRulesLoading] =
    useState(false);
  const [productivityRulesPageVisited, setProductivityRulesPageVisited] =
    useState(false);

  const handlePageChange = (id) => {
    if (id === 4 || id === 5 || id >= 8) {
      return;
    }
    setActivePage(id === activePage ? activePage : id);

    // if (id === 2 && teamPageVisited === false) {
    //   getTeamData();
    // }
    if (id === 3 && rolePageVisited === false) {
      getRoleData();
    }
    if (id === 6 && breakPageVisited === false) {
      getBreakData();
    }
    if (id === 7 && productivityRulesPageVisited === false) {
      getCategoryData();
    }
  };

  useEffect(() => {
    //null the usersearchvalue in redux
    const searchValue = "";
    dispatch(storeUserSearchValue(searchValue));
    dispatch(storeDesignationSearchValue(searchValue));
    dispatch(storeRoleSearchValue(searchValue));
    dispatch(storeBreakSearchValue(searchValue));
    //call user get api function
    getUsersData();
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    const orgId = localStorage.getItem("organizationId");
    localStorage.removeItem("rolesearchvalue");
    try {
      const response = await getUsers(orgId);
      const usersList = response.data;
      dispatch(storeUsersCount(usersList.length));
      dispatch(storeUsers(usersList));
      dispatch(storeUsersForTeamsTab(usersList));
    } catch (error) {
      dispatch(storeUsers([]));
      dispatch(storeUsersForTeamsTab([]));
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        getDesignationData();
      }, 350);
    }
  };

  const getDesignationData = async () => {
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getDesignation(orgId);
      const designationList = response.data;
      dispatch(storeDesignationCount(designationList.length));
      dispatch(storeDesignation(designationList));
      //filter active designation
      const filterActivedesignation = designationList.filter(
        (f) => f.active === true
      );
      dispatch(storeActiveDesignation(filterActivedesignation));
    } catch (error) {
      dispatch(storeActiveDesignation([]));
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getTeamData();
      }, 350);
    }
  };

  const getTeamData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getTeams(orgId);
      const teamList = response.data;
      dispatch(storeTeams(teamList));
      //filter active teams
      const filterActiveteams = teamList.filter((f) => f.active === true);
      dispatch(storeActiveTeam(filterActiveteams));
    } catch (error) {
      dispatch(storeActiveTeam([]));
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const getBreakData = async () => {
    setBreakLoading(true);
    try {
      const response = await getBreak();
      const allbreakDetails = response.data;
      dispatch(storesettingsBreak(allbreakDetails));
    } catch (error) {
      const allbreakDetails = [];
      dispatch(storesettingsBreak(allbreakDetails));
      CommonToaster(error?.response?.data.message, "error");
    } finally {
      setTimeout(() => {
        setBreakLoading(false);
        setBreakPageVisited(true);
      }, 350);
    }
  };

  const getRoleData = async () => {
    setRoleLoading(true);
    try {
      const response = await getRole();
      const roleList = response.data;
      const removeSuperAdmin = roleList.filter((f) => f.id != 1);
      dispatch(storeRole(removeSuperAdmin));
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      const roleList = [];
      dispatch(storeRole(roleList));
    } finally {
      setTimeout(() => {
        setRoleLoading(false);
        setRolePageVisited(true);
      }, 350);
    }
  };

  //productivity rules
  const getCategoryData = async () => {
    setProductivityRulesLoading(true);
    try {
      const response = await getCategories();
      const categoriesList = response?.data;
      console.log("categories response", categoriesList);
      categoriesList.pop();
      dispatch(storeCategories(categoriesList));
    } catch (error) {
      dispatch(storeCategories([]));
    } finally {
      setTimeout(() => {
        setProductivityRulesLoading(false);
        setProductivityRulesPageVisited(true);
      }, 350);
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
            {settingsList.map((item, index) => (
              <div
                key={index}
                className={
                  index === 3 || index === 4 || index >= 7
                    ? "settings_disabledlistContainer"
                    : item.id === activePage
                    ? "settings_activelistContainer"
                    : item.id != activePage
                    ? "settings_inactivelistContainer"
                    : ""
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
              <Role loading={roleLoading} />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <Workplace />
            </div>
          )}
          {activePage === 6 && (
            <div>
              <Break loading={breakLoading} />
            </div>
          )}
          {activePage === 7 && (
            <div>
              <ProductivityRules loading={productivityRulesLoading} />
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
