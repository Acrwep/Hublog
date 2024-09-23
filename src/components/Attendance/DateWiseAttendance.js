import React, { useState, useEffect } from "react";
import { Row, Col, Avatar, Button, Tooltip } from "antd";
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
  storeDatewiseAttendance,
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
  const datewiseAttendanceData = useSelector(
    (state) => state.datewiseattendance
  );
  const datewiseAttendanceAbsentData = useSelector(
    (state) => state.datewiseattendanceabsent
  );
  const datewiseAttendanceUsersData = useSelector(
    (state) => state.datewiseattendanceusers
  );
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [data, setData] = useState([]);
  const [absentList, setAbsentList] = useState([]);

  useEffect(() => {
    if (
      datewiseAttendanceData.length >= 1 ||
      datewiseAttendanceAbsentData.length >= 1
    ) {
      setData(datewiseAttendanceData);
      setAbsentList(datewiseAttendanceAbsentData);
      setTeamList(tList);
      setUserList(
        datewiseAttendanceUsersData.length >= 1
          ? datewiseAttendanceUsersData
          : uList
      );
      setTeamId(teamValue);
      setUserId(userValue);
      setDate(dateValue === null ? date : dateValue);
      const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
      setOrganizationId(orgId);
      return;
    }
    setTeamList(tList);
    setUserList(uList);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    setOrganizationId(orgId);
    getDailyAttendanceData(userId, teamId, orgId, date);
  }, []);

  const getDailyAttendanceData = async (
    userid,
    teamid,
    orgId,
    selectedDate,
    teamMembers
  ) => {
    const payload = {
      ...(userid && { userId: userid }),
      ...(teamid && { teamId: teamid }),
      organizationId: parseInt(orgId),
      date: moment(selectedDate).format("YYYY-MM-DD"),
    };
    try {
      const response = await getDailyAttendanceReport(payload);
      console.log("daily attendance response", response.data);

      const ReportData = response.data;

      const reverseData = ReportData.reverse();

      const absentList = uList.filter(
        (f) => !reverseData.some((item) => item.id === f.id)
      );
      console.log("absent list", absentList);
      dispatch(storeDatewiseAttendanceAbsentData(absentList));
      setAbsentList(absentList);

      //filter selected team absent list
      if ((userid === null || userid === undefined) && teamid) {
        const selectedTeamAbsentList = absentList.filter((f) =>
          teamMembers.some((item) => item.id === f.id)
        );
        setAbsentList(selectedTeamAbsentList);
        dispatch(storeDatewiseAttendanceAbsentData(selectedTeamAbsentList));
      }

      //filter selected user absent list
      if (userid) {
        const selectedUserAbsentlist = absentList.filter(
          (f) => f.id === userid
        );
        setAbsentList(selectedUserAbsentlist);
        dispatch(storeDatewiseAttendanceAbsentData(selectedUserAbsentlist));
      }

      dispatch(storeDatewiseAttendance(reverseData));
      setData(reverseData);
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
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
    setTeamId(null);
    dispatch(storeDatewiseAttendanceTeamValue(null));
    setUserId(null);
    dispatch(storeDatewiseAttendanceUserValue(null));
    setDate(new Date());
    dispatch(storeDatewiseAttendanceDateValue(null));
    getDailyAttendanceData(null, null, organizationId, new Date());
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
            <p className="datewise_presenttext">Present - {data.length}</p>

            <div className="datewise_presentlistmainContainer">
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="datewise_presentlistContainer" key={item.id}>
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
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="datewise_Container">
            <p className="datewise_absenttext">Absent - {absentList.length}</p>

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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DateWiseAttendance;
