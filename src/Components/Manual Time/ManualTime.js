import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Tooltip } from "antd";
import { MdTimer } from "react-icons/md";
import { RedoOutlined } from "@ant-design/icons";
import CommonDatePicker from "../Common/CommonDatePicker";
import CommonSelectField from "../Common/CommonSelectField";
import "./styles.css";
import CommonTimePicker from "../Common/CommonTimePicker";
import CommonTable from "../Common/CommonTable";
import CommonTextArea from "../Common/CommonTextArea";
import {
  selectValidator,
  descriptionValidator,
  endTimeValidator,
  getCurrentandPreviousweekDate,
} from "../Common/Validation";
import CommonImageUpload from "../Common/CommonImageUpload";
import PrismaZoom from "react-prismazoom";
import CommonAvatar from "../Common/CommonAvatar";
import CommonAddButton from "../Common/CommonAddButton";
import { CommonToaster } from "../Common/CommonToaster";
import {
  getManualtime,
  getTeams,
  getUsers,
  getUsersByTeamId,
} from "../APIservice.js/action";
import { FaRegUser } from "react-icons/fa6";
import { SlEye } from "react-icons/sl";
import axios from "axios";
import moment from "moment";
import CommonDoubleDatePicker from "../Common/CommonDoubleDatePicker";

export default function ManualTime() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [nonChangeUserList, setNonChangeUserList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [formUserId, setFormUserId] = useState(null);
  const [formUserIdError, setFormUserIdError] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [attachment, setAttachment] = useState();
  const [attachmentName, setAttachmentName] = useState("");
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  const [modalImageName, setModalImageName] = useState("");
  const [organizationId, setOrganizationId] = useState(null);
  const [data, setData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: 160,
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={26} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    {
      title: "Start time",
      dataIndex: "startTime",
      key: "startTime",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaRegUser
                color="#666767"
                size={14}
                style={{ marginRight: "4.5px" }}
              />
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "End time",
      dataIndex: "endTime",
      key: "endTime",
      width: 120,
      render: (text, record) => {
        if (text === "0001-01-01T00:00:00") {
          return null;
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaRegUser
                color="#666767"
                size={14}
                style={{ marginRight: "4.5px" }}
              />
              <p>{moment(text).format("hh:mm A")} </p>
            </div>
          );
        }
      },
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: 200,
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      width: 100,
      align: "center",
      render: (text, record) => {
        if (record.attachment === null) {
          return null;
        } else {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SlEye
                color="#666767"
                size={19}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleAttachmetModal(record.attachment, record.fileName)
                }
              />
            </div>
          );
        }
      },
    },
  ];

  useEffect(() => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    if (managerTeamId) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const managerTeamId = localStorage.getItem("managerTeamId");
    try {
      setOrganizationId(orgId);
      const response = await getTeams(orgId);
      const teamList = response.data;
      setTeamList(teamList);
      if (managerTeamId) {
        setTeamId(parseInt(managerTeamId));
      } else {
        setTeamId(null);
      }
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        if (managerTeamId) {
          getUsersDataByTeamId();
        } else {
          getUsersData();
        }
      }, 500);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    try {
      const response = await getUsers(orgId);
      const users = response?.data;

      setUserId(null);
      setUserList(users);
      setNonChangeUserList(users);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    } finally {
      setTimeout(() => {
        getManualtimeData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 500);
    }
  };

  const getUsersDataByTeamId = async () => {
    const orgId = localStorage.getItem("organizationId");
    const managerTeamId = localStorage.getItem("managerTeamId");
    const PreviousAndCurrentDate = getCurrentandPreviousweekDate();
    setSelectedDates(PreviousAndCurrentDate);
    try {
      const response = await getUsersByTeamId(managerTeamId);
      const teamMembersList = response?.data?.team?.users;
      setUserList(teamMembersList);
      setNonChangeUserList(teamMembersList);
    } catch (error) {
      CommonToaster(error?.message, "error");
      const teamMembersList = [];
      setNonChangeUserList(teamMembersList);
    } finally {
      setTimeout(() => {
        getManualtimeData(
          orgId,
          null,
          null,
          PreviousAndCurrentDate[0],
          PreviousAndCurrentDate[1]
        );
      }, 350);
    }
  };

  const getManualtimeData = async (
    orgId,
    teamid,
    userid,
    startdate,
    enddate
  ) => {
    setLoading(true);
    const payload = {
      organizationId: orgId,
      ...(teamid && { teamId: teamid }),
      ...(userid && { userId: userid }),
      startDate: startdate,
      endDate: enddate,
    };
    try {
      const response = await getManualtime(payload);
      const datas = response?.data;
      const reverse = datas.reverse();
      setData(reverse);
    } catch (error) {
      setData([]);
      const Error = error?.response?.data?.message;
      if (Error != "No manual time entries found.") {
        CommonToaster(Error, "error");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  //onchange function
  const onDoubleDateChange = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDates(dateString); // Update the state when the date changes
    if (dateString[0] != "" && dateString[1] != "") {
      setLoading(true);
      getManualtimeData(
        organizationId,
        teamId,
        userId,
        dateString[0],
        dateString[1]
      );
    }
  };

  const handleTeam = async (value) => {
    setTeamId(value);
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
      getManualtimeData(
        organizationId,
        value,
        userIdd,
        selectedDates[0],
        selectedDates[1]
      );
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
    getManualtimeData(
      organizationId,
      teamId,
      value,
      selectedDates[0],
      selectedDates[1]
    );
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
    setDateError(selectValidator(date));
  };

  const handleStartTime = (time, timeString) => {
    setStartTime(time);
    setStartTimeError(selectValidator(time));
  };

  const handleEndTime = (time, timeString) => {
    setEndTime(time);
    setEndTimeError(endTimeValidator(time, startTime));
  };

  const handleAttachment = (file) => {
    console.log("Attachment", file);

    // Ensure file is an array and has at least one element
    if (Array.isArray(file) && file.length > 0) {
      const firstFile = file[0];
      setAttachment(firstFile); // Save the first file
      setAttachmentName(firstFile.name); // Save the name of the first file

      // Create FormData and append the first file
      const formData = new FormData();
      formData.append("image", firstFile.originFileObj);
      // Log FormData content
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      // Handle case when no file is selected
      setAttachment([]);
      setAttachmentName("");
    }
  };

  const formRestart = () => {
    setIsModalOpen(false);
    setDate("");
    setDateError("");
    setStartTime("");
    setStartTimeError("");
    setEndTime("");
    setEndTimeError("");
    setFormUserId(null);
    setFormUserIdError("");
    setSummary("");
    setSummaryError("");
    setAttachment("");
    setAttachmentName("");
  };

  const handleRefresh = () => {
    const managerTeamId = localStorage.getItem("managerTeamId");
    const PreviousandCurrentDate = getCurrentandPreviousweekDate();

    const today = new Date();
    const givenDate = new Date(selectedDates[1]);
    let isCurrentDate = false;
    let isPreviousChange = false;

    if (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    ) {
      isCurrentDate = true;
    } else {
      isCurrentDate = false;
    }

    if (PreviousandCurrentDate[0] === selectedDates[0]) {
      isPreviousChange = false;
    } else {
      isPreviousChange = true;
    }

    if (
      teamId === null &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }
    if (
      managerTeamId &&
      userId === null &&
      isCurrentDate === true &&
      isPreviousChange === false
    ) {
      return;
    }
    setLoading(true);
    setTeamId(managerTeamId ? parseInt(managerTeamId) : null);
    setUserId(null);
    setUserList(nonChangeUserList);
    setSelectedDates(PreviousandCurrentDate);
    getManualtimeData(
      organizationId,
      managerTeamId ? parseInt(managerTeamId) : null,
      null,
      PreviousandCurrentDate[0],
      PreviousandCurrentDate[1]
    );
  };
  const handleCancel = () => {
    formRestart();
  };

  const handleOk = async () => {
    const dateValidate = selectValidator(date);
    const starttimeValidate = selectValidator(startTime);
    const endtimeValidate = endTimeValidator(endTime, startTime);
    const userValidate = selectValidator(formUserId);
    const summaryValidate = descriptionValidator(summary);
    setDateError(dateValidate);
    setStartTimeError(starttimeValidate);
    setEndTimeError(endtimeValidate);
    setFormUserIdError(userValidate);
    setSummaryError(summaryValidate);

    if (
      dateValidate ||
      starttimeValidate ||
      endtimeValidate ||
      userValidate ||
      summaryValidate
    )
      return;
    const star_Time = new Date(startTime.$d);
    const end_Time = new Date(endTime.$d);
    const orgId = localStorage.getItem("organizationId");

    const formData = new FormData();
    formData.append("organizationId", orgId);
    formData.append("date", moment(date).format("YYYY-MM-DD HH:mm:ss.SSS"));
    formData.append("startTime", moment(star_Time).format("HH:mm:ss"));
    formData.append("endTime", moment(end_Time).format("HH:mm:ss"));
    formData.append("userId", formUserId);
    formData.append("summary", summary);
    if (attachment?.originFileObj) {
      formData.append("attachment", attachment.originFileObj);
    }

    // Log FormData content
    for (let [key, value] of formData.entries()) {
      if (key === "image" && value instanceof File) {
        console.log(
          `${key}:`,
          `name=${value.name}, size=${value.size} bytes, type=${value.type}`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    try {
      const subDomain = localStorage.getItem("subDomain");
      let APIURL = "";

      if (process.env.NODE_ENV === "production") {
        APIURL = `https://${
          subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
        }workstatus.qubinex.com:8086`; // production
      } else {
        APIURL = `https://${
          subDomain !== "null" && subDomain !== null ? subDomain + "." : ""
        }localhost:7263`; //dev
      }
      const AccessToken = localStorage.getItem("Accesstoken");
      const response = await axios.post(
        `${APIURL}/api/Manual_Time/InsertManualTime`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AccessToken}`, // Replace with your token
          },
        }
      );
      formRestart();
      CommonToaster("Success! Data added to the Attendance table.", "success");
    } catch (error) {
      console.error("Error posting data:", error);
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      getManualtimeData(
        organizationId,
        teamId,
        userId,
        selectedDates[0],
        selectedDates[1]
      );
    }
  };

  const handleAttachmetModal = (attachment, attachmentName) => {
    setIsAttachmentOpen(true);
    const type = attachmentName.split(".")[1];
    const base64String = `data:image/${type};base64,${attachment}`;
    setModalImage(base64String);
    setModalImageName(attachmentName);
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdTimer size={20} />
        </div>
        <h2 className="allpage_mainheadings">Manual Time</h2>
      </div>

      <Row className="breakreports_calendarrowContainer">
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
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          {/* <CommonAddButton
            name="Add Manual Time"
            onClick={() => setIsModalOpen(true)}
          /> */}
          <CommonDoubleDatePicker
            onChange={onDoubleDateChange}
            value={selectedDates}
          />
          <div style={{ marginLeft: "12px" }}>
            <CommonAddButton onClick={() => setIsModalOpen(true)} name="Add" />
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
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 900 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          size="small"
          loading={loading}
        />
      </div>

      {/* add manualtime modal */}
      <Modal
        title="Add Manual Time"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button className="designation_submitbutton" onClick={handleOk}>
            Submit
          </button>,
        ]}
        style={{
          top: 20,
        }}
      >
        <CommonDatePicker
          label="Date"
          placeholder="Start Date"
          onChange={onDateChange}
          value={date}
          error={dateError}
          mandatory
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <CommonTimePicker
              label="Start Time"
              onChange={handleStartTime}
              value={startTime}
              error={startTimeError}
              mandatory
            />
          </Col>
          <Col span={12}>
            <CommonTimePicker
              label="End Time"
              onChange={handleEndTime}
              value={endTime}
              error={endTimeError}
              mandatory
            />
          </Col>
        </Row>
        <CommonSelectField
          label="User"
          options={nonChangeUserList}
          onChange={(value) => {
            setFormUserId(value);
            setFormUserIdError(selectValidator(value));
          }}
          value={formUserId}
          error={formUserIdError}
          mandatory
          style={{ marginBottom: "20px" }}
        />
        <CommonTextArea
          label="Summary"
          onChange={(e) => {
            setSummary(e.target.value);
            setSummaryError(descriptionValidator(e.target.value));
          }}
          value={summary}
          error={summaryError}
          style={{ marginBottom: "20px" }}
          mandatory
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CommonImageUpload
            label="Attachment"
            uploadedFile={handleAttachment}
            imageName={attachmentName}
            style={{ marginBottom: "20px" }}
          />
        </div>
      </Modal>

      <Modal
        title={modalImageName}
        open={isAttachmentOpen}
        centered={true}
        onCancel={() => setIsAttachmentOpen(false)}
        footer={false}
      >
        <div className="manualtime_attachmentContainer">
          <PrismaZoom className="prismazoom">
            <img
              src={modalImage}
              className="manualtime_attachment"
              alt="Base64 Image"
              style={{ cursor: "pointer" }}
            />
          </PrismaZoom>
        </div>
      </Modal>
    </div>
  );
}
