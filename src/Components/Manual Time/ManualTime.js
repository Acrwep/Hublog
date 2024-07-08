import React, { useState } from "react";
import { Row, Col, Button, Modal } from "antd";
import { MdTimer } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import CommonDatePicker from "../Common/CommonDatePicker";
import CommonSelectField from "../Common/CommonSelectField";
import "./styles.css";
import CommonTimePicker from "../Common/CommonTimePicker";
import CommonInputField from "../Common/CommonInputField";
import CommonTextArea from "../Common/CommonTextArea";

export default function ManualTime() {
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timedistributionOptions = [
    { id: 1, name: "Productive" },
    { id: 2, name: "Neutral" },
    { id: 3, name: "Un Productive" },
  ];
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {};
  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <MdTimer size={20} />
        </div>
        <h2 className="allpage_mainheadings">Manual Time</h2>
      </div>

      <Row style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={7} lg={7}>
          <div className="summary_container">
            <Button
              className={
                activePage === 1
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              // onClick={() => handlePageChange(1)}
            >
              Pending
            </Button>
            <Button
              className={
                activePage === 2
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              // onClick={() => handlePageChange(2)}
            >
              Approved
            </Button>
            <Button
              className={
                activePage === 3
                  ? "attendance_activesummarybutton "
                  : "attendance_summarybutton"
              }
              // onClick={() => handlePageChange(3)}
            >
              Rejected
            </Button>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={17}
          lg={17}
          className="addmanualtimebutton_column"
        >
          <button
            className="designation_addbutton"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosAdd className="designationbutton_addicon" /> Add Manual Time
          </button>
        </Col>
      </Row>

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
          mandatory
          style={{ marginTop: "20px", marginBottom: "20px" }}
        />
        <Row gutter={16} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            <CommonTimePicker label="Start Time" mandatory />
          </Col>
          <Col span={12}>
            <CommonTimePicker label="End Time" mandatory />
          </Col>
        </Row>
        <CommonSelectField
          label="Time attribution"
          options={timedistributionOptions}
          mandatory
          style={{ marginBottom: "20px" }}
        />
        <CommonTextArea label="Summary" />
        {/* <CommonSelectField
          label="Owner"
          options={ownerList}
          onChange={(value) => setOwner(value)}
          value={owner}
          error={ownerError}
          mandatory
          style={{ marginBottom: "20px" }}
        />
        <CommonSelectField
          label="Project Status"
          options={statusList}
          value={status}
          onChange={(value) => setStatus(value)}
        /> */}
      </Modal>
    </div>
  );
}
