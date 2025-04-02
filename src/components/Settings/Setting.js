import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import Break from "./Break/Break";
import {
  getAlertRules,
  getAllUsers,
  getBreak,
  getCategories,
  getDesignation,
  getGoals,
  getImbuildAppsandUrls,
  getRole,
  getShifts,
  getTeams,
  getWellnessRules,
} from "../APIservice.js/action";
import AlertRules from "./AlertRules/AlertRules";
import {
  addteamMembers,
  storeActiveDesignation,
  storeActiveTeam,
  storeActiveUsersCount,
  storeAlertRules,
  storeBreakSearchValue,
  storeCategories,
  storeDesignation,
  storeDesignationCount,
  storeDesignationSearchValue,
  storeGoalRules,
  storeImbuildAppsandUrls,
  storeImbuildappsandurlsCount,
  storeMappingSearchValue,
  storeMappingShowId,
  storeMappingStatusId,
  storeRole,
  storeRoleSearchValue,
  storesettingsBreak,
  storeSettingsShifts,
  storeTeams,
  storeUsers,
  storeUsersCount,
  storeUserSearchValue,
  storeUsersForTeamsTab,
  storeWellnessRules,
} from "../Redux/slice";
import { CommonToaster } from "../Common/CommonToaster";
import ProductivityRules from "./ProductivityRules/ProductivityRules";
import Shifts from "./Shifts/Shifts";

const Settings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [breakLoading, setBreakLoading] = useState(true);
  const [shiftLoading, setShiftsLoading] = useState(true);
  const [workplaceLoading, setWorkplaceLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [alertRulesLoading, setAlertRulesLoading] = useState(true);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const settingsList = [
    {
      id: 1,
      name: "Users & Designations",
      icon: <FiUser size={21} />,
    },
    { id: 2, name: "Teams", icon: <LuUsers size={21} /> },
    { id: 3, name: "Roles", icon: <MdAccessTime size={21} /> },
    { id: 4, name: "Wellness Rules", icon: <SiWorkplace size={21} /> },
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
  const [alertRulesPageVisited, setAlertRulesPageVisited] = useState(false);
  const [workplacePageVisited, setWorkplacePageVisited] = useState(false);
  const [shiftsPageVisited, setShitsPageVisited] = useState(false);
  const [goalsPageVisited, setGolasPageVisited] = useState(false);

  const handlePageChange = (id) => {
    if (id === 9 || id === 11) {
      return;
    }
    setActivePage(id === activePage ? activePage : id);

    // if (id === 2 && teamPageVisited === false) {
    //   getTeamData();
    // }
    if (id === 3 && rolePageVisited === false) {
      getRoleData();
    }
    if (id === 4 && workplacePageVisited === false) {
      getWellnessData();
    }
    if (id === 5 && shiftsPageVisited === false) {
      getShiftData();
    }
    if (id === 6 && breakPageVisited === false) {
      getBreakData();
    }
    if (id === 7 && productivityRulesPageVisited === false) {
      getCategoryData();
    }
    if (id === 8 && alertRulesPageVisited === false) {
      getAlertRulesData();
    }
    if (id === 10 && goalsPageVisited === false) {
      getGoalsData();
    }
  };

  useEffect(() => {
    //null the usersearchvalue in redux
    const searchValue = "";
    dispatch(storeUserSearchValue(searchValue));
    dispatch(storeDesignationSearchValue(searchValue));
    dispatch(storeRoleSearchValue(searchValue));
    dispatch(storeBreakSearchValue(searchValue));
    dispatch(storeMappingSearchValue(searchValue));
    dispatch(storeMappingShowId(1));
    dispatch(storeMappingStatusId(1));
    dispatch(storeDesignation([]));
    dispatch(storeActiveDesignation([]));
    dispatch(storeTeams([]));
    //call user get api function
    getUsersData();
  }, []);

  const getUsersData = async () => {
    setLoading(true);
    const orgId = localStorage.getItem("organizationId");
    localStorage.removeItem("rolesearchvalue");
    try {
      const response = await getAllUsers(orgId);
      const usersList = response.data;
      const activeUsersList = usersList.filter((f) => f.active === true);
      dispatch(storeUsersCount(usersList.length));
      dispatch(storeActiveUsersCount(activeUsersList.length));
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
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const payload = {
      organizationId: orgId,
    };
    try {
      const response = await getBreak(payload);
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

  const getShiftData = async () => {
    setShiftsLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getShifts(orgId);
      const allShiftDetails = response.data;
      dispatch(storeSettingsShifts(allShiftDetails));
    } catch (error) {
      const allShiftDetails = [];
      dispatch(storeSettingsShifts(allShiftDetails));
      CommonToaster(error?.response?.data.message, "error");
    } finally {
      setTimeout(() => {
        setShiftsLoading(false);
        setShitsPageVisited(true);
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
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getCategories(orgId);
      const categoriesList = response?.data;
      console.log("categories response", categoriesList);
      dispatch(storeCategories(categoriesList));
    } catch (error) {
      dispatch(storeCategories([]));
    } finally {
      setTimeout(() => {
        getImbuildAppsandUrlsData();
      }, 350);
    }
  };

  const getAlertRulesData = async () => {
    setAlertRulesLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getAlertRules(orgId);
      const alertruleList = response?.data;
      console.log("alertrules response", alertruleList);
      dispatch(storeAlertRules(alertruleList));
    } catch (error) {
      dispatch(storeAlertRules([]));
    } finally {
      setTimeout(() => {
        setAlertRulesPageVisited(true);
        setAlertRulesLoading(false);
      }, 350);
    }
  };

  const getGoalsData = async () => {
    setGoalsLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getGoals(orgId);
      const golasList = response?.data;
      console.log("goals response", golasList);
      dispatch(storeGoalRules(golasList));
    } catch (error) {
      dispatch(storeGoalRules([]));
    } finally {
      setTimeout(() => {
        setGolasPageVisited(true);
        setGoalsLoading(false);
      }, 350);
    }
  };

  const getWellnessData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getWellnessRules(orgId);
      console.log("wellness response", response.data);
      const wellnessData = response.data;
      dispatch(storeWellnessRules(wellnessData));
    } catch (error) {
      dispatch(storeWellnessRules([]));
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setWorkplacePageVisited(true);
        setWorkplaceLoading(false);
      }, 350);
    }
  };

  const getImbuildAppsandUrlsData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const payload = {
      organizationId: orgId,
    };
    try {
      const response = await getImbuildAppsandUrls(payload);
      console.log(response);
      const imbuildData = response?.data?.data;
      dispatch(storeImbuildappsandurlsCount(imbuildData.length));
      dispatch(storeImbuildAppsandUrls(imbuildData));
    } catch (error) {
      dispatch(storeImbuildAppsandUrls([]));
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
            ? "> Wellness Rules"
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
                  index === 8 || index === 10
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
          {activePage === 5 && (
            <div>
              <Shifts loading={shiftLoading} />
            </div>
          )}
          {activePage === 4 && (
            <div>
              <Workplace mainloader={workplaceLoading} />
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
              <AlertRules loading={alertRulesLoading} />
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
