import React, { useState, useEffect } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { TbCirclesFilled } from "react-icons/tb";
import Summary from "./Summary";
import AttendanceDetail from "./AddendanceDetail";
import DateWiseAttendance from "./DateWiseAttendance";
import "./styles.css";
import { CommonToaster } from "../Common/CommonToaster";
import Loader from "../Common/Loader";
import { getTeams, getUsers } from "../APIservice.js/action";
import { useDispatch } from "react-redux";
import {
  storeDatewiseAttendance,
  storeDatewiseAttendanceAbsentData,
  storeDatewiseAttendanceDateValue,
  storeDatewiseAttendanceTeamValue,
  storeDatewiseAttendanceUsersData,
  storeDatewiseAttendanceUserValue,
} from "../Redux/slice";

const Attendance = () => {
  const dispatch = useDispatch();
  // Sample data for charts
  const [activePage, setActivePage] = useState(1);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    setLoading(true);
    setActivePage(1);
    getTeamData();
  }, []);

  const getTeamData = async () => {
    //empty the datewise attendance tab redux values
    const emptyData = [];
    dispatch(storeDatewiseAttendanceTeamValue(null));
    dispatch(storeDatewiseAttendanceUserValue(null));
    dispatch(storeDatewiseAttendanceDateValue(null));
    dispatch(storeDatewiseAttendance(emptyData));
    dispatch(storeDatewiseAttendanceAbsentData(emptyData));
    dispatch(storeDatewiseAttendanceUsersData(emptyData));
    try {
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      setTeamId(null);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 500);
    }
  };

  const getUsersData = async () => {
    let userIdd = null;
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getUsers(orgId);
      const usersList = response?.data;

      //merge user fullname and lastname in full_name property
      const updateUserList = usersList.map((item) => {
        return { ...item, full_Name: item.first_Name + " " + item.last_Name };
      });
      setUserList(updateUserList);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <TbCirclesFilled size={20} />
            </div>
            <h2 className="allpage_mainheadings">Attendance</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={9}>
          <div className="summary_container">
            <Button
              className={
                activePage === 1
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(1)}
            >
              Summary
            </Button>
            <Button
              className={
                activePage === 2
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(2)}
            >
              Detailed
            </Button>
            <Button
              className={
                activePage === 3
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => handlePageChange(3)}
            >
              Datewise Attendance
            </Button>
          </div>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {activePage === 1 && (
            <div>
              <Summary />
              {/* Add your content for page 1 here */}
            </div>
          )}
          {activePage === 2 && (
            <div>
              <AttendanceDetail />
            </div>
          )}
          {activePage === 3 && (
            <div>
              <DateWiseAttendance tList={teamList} uList={userList} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
