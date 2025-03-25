import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Button, Tooltip } from "antd";
import { PiArrowDownLeftBold, PiArrowUpRightBold } from "react-icons/pi";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonSelectField from "../Common/CommonSelectField";
import { CommonToaster } from "../Common/CommonToaster";
import CommonDatePicker from "../Common/CommonDatePicker";
import {
  getDailyAttendanceReport,
  getUsersByTeamId,
} from "../APIservice.js/action";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  storeDatewiseAttendancePresentData,
  storeDatewiseAttendanceAbsentData,
  storeDatewiseAttendanceDateValue,
  storeDatewiseAttendanceTeamValue,
  storeDatewiseAttendanceUsersData,
  storeDatewiseAttendanceUserValue,
} from "../Redux/slice";
import CommonAvatar from "../Common/CommonAvatar";

const DateWiseAttendance = ({ tList, uList }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const teamValue = useSelector((state) => state.datewiseattendanceteamvalue);
  const userValue = useSelector((state) => state.datewiseattendanceuservalue);
  const dateValue = useSelector((state) => state.datewiseattendancedatevalue);
  const datewiseAttendancePresentData = useSelector(
    (state) => state.datewiseattendancepresentdata
  );
  const datewiseAttendanceAbsentData = useSelector(
    (state) => state.datewiseattendanceabsentdata
  );
  const datewiseAttendanceUsersData = useSelector(
    (state) => state.datewiseattendanceusers
  );
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [presentList, setPresentList] = useState([]);
  const [presentCount, setPresentCount] = useState(null);
  const [absentList, setAbsentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (
      datewiseAttendancePresentData.length >= 1 ||
      datewiseAttendanceAbsentData.length >= 1
    ) {
      setPresentList(datewiseAttendancePresentData);
      setAbsentList(datewiseAttendanceAbsentData);
      setTeamList(tList);
      setUserList(
        datewiseAttendanceUsersData.length >= 1
          ? datewiseAttendanceUsersData
          : uList
      );
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
        setIsManager(true);
      } else {
        setTeamId(teamValue);
        setIsManager(false);
      }
      setUserId(userValue);
      setDate(dateValue === null ? date : dateValue);
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

      setOrganizationId(orgId);
      return;
    }
    setTeamList(tList);
    setUserList(uList);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    if (managerTeamId) {
      setTeamId(parseInt(managerTeamId));
      setIsManager(true);
    } else {
      setTeamId(null);
      setIsManager(false);
    }
    setOrganizationId(orgId);
    getDailyAttendanceData(
      userId,
      managerTeamId ? managerTeamId : teamId,
      orgId,
      date
    );
  }, []);

  const getDailyAttendanceData = async (
    userid,
    teamid,
    orgId,
    selectedDate,
    teamMembers
  ) => {
    setLoading(true);
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: parseInt(orgId),
      date: moment(selectedDate).format("YYYY-MM-DD"),
    };
    try {
      const response = await getDailyAttendanceReport(payload);
      console.log("daily attendance response", response.data);

      const dailyAttendanceReportData = response.data;

      const reverseData = dailyAttendanceReportData.reverse();

      const presentData = reverseData.filter((p) => p.remark === "Present");
      const absentData = reverseData.filter((p) => p.remark === "Absent");

      setPresentList(presentData);
      dispatch(storeDatewiseAttendancePresentData(presentData));
      dispatch(storeDatewiseAttendanceAbsentData(absentData));
      setAbsentList(absentData);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  const handleTeam = async (value) => {
    setTeamId(value);
    dispatch(storeDatewiseAttendanceTeamValue(value));
    try {
      const response = await getUsersByTeamId(value);
      const teamMembersList = response?.data?.team?.users;
      if (teamMembersList.length <= 0) {
        setUserList([]);
        setUserId(null);
        return;
      }

      setUserList(teamMembersList);
      const userIdd = null;
      setUserId(userIdd);
      dispatch(storeDatewiseAttendanceUserValue(userIdd));
      dispatch(storeDatewiseAttendanceUsersData(teamMembersList));
      getDailyAttendanceData(
        userIdd,
        value,
        organizationId,
        date,
        teamMembersList
      );
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const onDateChange = (value) => {
    setDate(value);
    dispatch(storeDatewiseAttendanceDateValue(value));
    getDailyAttendanceData(userId, teamId, organizationId, value, userList);
  };

  const handleUser = (value) => {
    setUserId(value);
    dispatch(storeDatewiseAttendanceUserValue(value));
    getDailyAttendanceData(value, teamId, organizationId, date);
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");

    const today = new Date();
    const givenDate = new Date(date);
    let isCurrentDate = false;

    if (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    ) {
      isCurrentDate = true;
    } else {
      isCurrentDate = false;
    }

    if (teamId === null && userId === null && isCurrentDate === true) {
      return;
    }
    if (managerTeamId && userId === null && isCurrentDate === true) {
      return;
    }
    if (managerTeamId) {
      setTeamId(parseInt(managerTeamId));
    } else {
      setTeamId(null);
    }
    dispatch(storeDatewiseAttendanceTeamValue(null));
    setUserId(null);
    dispatch(storeDatewiseAttendanceUserValue(null));
    setDate(new Date());
    dispatch(storeDatewiseAttendanceDateValue(null));
    getDailyAttendanceData(
      null,
      managerTeamId ? managerTeamId : null,
      organizationId,
      new Date()
    );
  };

  return (
    <div>
      <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div
            className="field_selectfielsContainer"
            style={{ display: "flex" }}
          >
            <div className="field_teamselectfieldContainer">
              <CommonSelectField
                options={teamList}
                placeholder="All Teams"
                onChange={handleTeam}
                value={teamId}
                disabled={isManager}
              />
            </div>
            <div style={{ width: "170px" }}>
              <CommonSelectField
                options={userList}
                placeholder="Select User"
                onChange={handleUser}
                value={userId}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="wellness_calendarContainer">
            <div>
              <CommonDatePicker onChange={onDateChange} value={date} />
            </div>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                onClick={handleRefresh}
                style={{ marginLeft: "12px" }}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="datewise_Container">
            <p className="datewise_presenttext">
              Present - {presentList.length}
            </p>

            <div className="datewise_presentlistmainContainer">
              {loading ? (
                <div className="screenshots_spinContainer">
                  <Spin />
                </div>
              ) : (
                <>
                  {presentList.map((item, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="datewise_presentlistContainer"
                        key={item.id}
                      >
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={12}>
                            <div className="presentlist_avatarContainer">
                              <CommonAvatar
                                avatarSize={29}
                                itemName={item.full_Name}
                              />
                              <p className="datewise_presentlistnames">
                                {item.full_Name}
                              </p>
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
                              <p className="datewise_checkintime">
                                {" "}
                                {moment(item.inTime).format("hh:mm A")}
                              </p>
                            </div>
                            <div
                              className="datewise_inouttimeContainer"
                              style={{ marginLeft: "12px", width: "100px" }}
                            >
                              <PiArrowUpRightBold size={20} color="#e93b3a" />
                              <p className="datewise_checkintime">
                                {item.out === "0001-01-01T00:00:00"
                                  ? " "
                                  : moment(item.out).format("hh:mm A")}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr className="presentname_hrtag" />
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="datewise_Container">
            <p className="datewise_absenttext">Absent - {absentList.length}</p>

            <div className="datewise_presentlistmainContainer">
              {loading ? (
                <div className="screenshots_spinContainer">
                  <Spin />
                </div>
              ) : (
                <>
                  {absentList.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="datewise_presentlistContainer">
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={24}>
                            <div className="presentlist_avatarContainer">
                              <CommonAvatar
                                avatarSize={29}
                                itemName={item.full_Name}
                              />
                              <p className="datewise_presentlistnames">
                                {item.full_Name}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr className="presentname_hrtag" />
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DateWiseAttendance;
