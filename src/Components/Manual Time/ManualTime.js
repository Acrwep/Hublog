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
} from "../Common/Validation";
import CommonImageUpload from "../Common/CommonImageUpload";
import CommonAvatar from "../Common/CommonAvatar";
import CommonAddButton from "../Common/CommonAddButton";
import { CommonToaster } from "../Common/CommonToaster";
import { getTeams, getUsers, getUsersByTeamId } from "../APIservice.js/action";

export default function ManualTime() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [attachment, setAttachment] = useState([]);
  const [attachmentName, setAttachmentName] = useState("");
  const [organizationId, setOrganizationId] = useState(null);
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
    },
    {
      title: "Start time",
      dataIndex: "starttime",
      key: "starttime",
      width: 120,
    },
    {
      title: "End time",
      dataIndex: "endtime",
      key: "endtime",
      width: 120,
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: 220,
    },
  ];
  const data = [
    {
      key: "1",
      full_Name: "Balaji R",
      date: "07/07/2024",
      starttime: "09:23 AM",
      endtime: "11:23 AM",
      timeattribution: "Productive",
      summary:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      key: "2",
      full_Name: "Leo Dass",
      date: "09/07/2024",
      starttime: "12:23 AM",
      endtime: "01:23 PM",
      timeattribution: "Productive",
      summary:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      key: "3",
      full_Name: "Rahul R",
      date: "12/07/2024",
      starttime: "14:23 AM",
      endtime: "16:23 PM",
      timeattribution: "Productive",
      summary:
        "when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      key: "4",
      full_Name: "Fazil S",
      date: "14/07/2024",
      starttime: "16:23 AM",
      endtime: "17:23 PM",
      timeattribution: "Productive",
      summary:
        "It has roots in a piece of classical Latin literature from 45 BC",
    },
  ];

  useEffect(() => {
    getTeamData();
  }, []);

  const getTeamData = async () => {
    setLoading(true);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
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
    const orgId = localStorage.getItem("organizationId");
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
        setLoading(false);
      }, 500);
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
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
      setUserList([]);
    }
  };

  const handleUser = (value) => {
    setUserId(value);
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Update the state when the date changes
    setDateError(selectValidator(date));
  };

  const handleStartTime = (time, timeString) => {
    console.log(time, timeString);
    setStartTime(time);
    setStartTimeError(selectValidator(time));
  };

  const handleEndTime = (time, timeString) => {
    setEndTime(time);
    setEndTimeError(endTimeValidator(time, startTime));
  };

  const handleAttachment = (file) => {
    console.log("Attachment", file, file.name);
    if (file.length >= 1) {
      setAttachment(file);
      file.map((f) => {
        setAttachmentName(f.name);
      });
    } else {
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
    if (teamId === null && userId === null) {
      return;
    } else {
      setTeamId(null);
      setUserId(null);
      setUserList(nonChangeUserList);
    }
  };
  const handleCancel = () => {
    formRestart();
  };

  const handleOk = () => {
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

    const payload = {
      date: date.format("DD-MM-YYYY"),
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
      userId: formUserId,
      summary: summary,
      ...(attachment.length >= 1 ? { attachment: attachment[0] } : {}),
    };
    console.log("Manula Time Payload", payload);
    formRestart();
    CommonToaster("Manual Time Created Successfully", "success");
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
          <CommonAddButton
            name="Add Manual Time"
            onClick={() => setIsModalOpen(true)}
          />
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
    </div>
  );
}
