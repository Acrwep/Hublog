import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { MdTimer } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import CommonDatePicker from "../Common/CommonDatePicker";
import CommonSelectField from "../Common/CommonSelectField";
import "./styles.css";
import CommonTimePicker from "../Common/CommonTimePicker";
import CommonTable from "../Common/CommonTable";
import CommonTextArea from "../Common/CommonTextArea";
import { selectValidator, nameValidator } from "../Common/Validation";
import CommonImageUpload from "../Common/CommonImageUpload";
import PendingManulaTime from "./PendingManualTime";
import ApprovedManualTime from "./ApprovedManualTime";
import RejectedManualTime from "./RejectedManulaTime";
import CommonAddButton from "../Common/CommonAddButton";

export default function ManualTime() {
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const [timeAttribution, setTimeAttribution] = useState("");
  const [timeAttributionError, setTimeAttributionError] = useState("");
  const timedistributionOptions = [
    { id: 1, name: "Productive" },
    { id: 2, name: "Neutral" },
    { id: 3, name: "Un Productive" },
  ];
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [attachmentName, setAttachmentName] = useState("");

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
    setEndTimeError(selectValidator(time));
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
  const handleCancel = () => {
    setIsModalOpen(false);
    setDate("");
    setDateError("");
    setStartTime("");
    setStartTimeError("");
    setEndTime("");
    setEndTimeError("");
    setTimeAttribution("");
    setTimeAttributionError("");
    setSummary("");
    setSummaryError("");
    setAttachment("");
    setAttachmentName("");
  };

  const handleOk = () => {
    const dateValidate = selectValidator(date);
    const starttimeValidate = selectValidator(startTime);
    const endtimeValidate = selectValidator(endTime);
    const timeattributionValidate = selectValidator(timeAttribution);
    const summaryValidate = nameValidator(summary);

    setDateError(dateValidate);
    setStartTimeError(starttimeValidate);
    setEndTimeError(endtimeValidate);
    setTimeAttributionError(timeattributionValidate);
    setSummaryError(summaryValidate);

    if (
      dateValidate ||
      starttimeValidate ||
      endtimeValidate ||
      timeattributionValidate ||
      summaryValidate
    )
      return;
  };
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdTimer size={20} />
        </div>
        <h2 className="allpage_mainheadings">Manual Time</h2>
      </div>

      <Row style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="manualpending_container">
            <Button
              className={
                activePage === 1
                  ? "manualpending_activebutton "
                  : "manualpending_button"
              }
              onClick={() => setActivePage(1)}
            >
              Pending
            </Button>
            <Button
              className={
                activePage === 2
                  ? "manualpending_activebutton "
                  : "manualpending_button"
              }
              onClick={() => setActivePage(2)}
            >
              Approved
            </Button>
            <Button
              className={
                activePage === 3
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              onClick={() => setActivePage(3)}
            >
              Rejected
            </Button>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="addmanualtimebutton_column"
        >
          <CommonAddButton
            name="Add Manual Time"
            onClick={() => setIsModalOpen(true)}
          />
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        {activePage === 1 ? (
          <PendingManulaTime />
        ) : activePage === 2 ? (
          <ApprovedManualTime />
        ) : activePage === 3 ? (
          <RejectedManualTime />
        ) : (
          ""
        )}
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
          label="Time attribution"
          options={timedistributionOptions}
          onChange={(value) => {
            setTimeAttribution(value);
            setTimeAttributionError(selectValidator(value));
          }}
          value={timeAttribution}
          error={timeAttributionError}
          mandatory
          style={{ marginBottom: "20px" }}
        />
        <CommonTextArea
          label="Summary"
          onChange={(e) => {
            setSummary(e.target.value);
            setSummaryError(nameValidator(e.target.value));
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
