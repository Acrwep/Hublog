import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import { TbReport } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import "./styles.css";
import CommonInputField from "../components/Common/CommonInputField";
import CommonSelectField from "../components/Common/CommonSelectField";
import CommonTable from "../components/Common/CommonTable";
import {
  nameValidator,
  selectValidator,
} from "../components/Common/Validation";

const Project = () => {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owner, setOwner] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const ownerList = [
    { id: 1, name: "balaji@gmail.com" },
    { id: 2, name: "Rubi@gmail.com" },
  ];
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
    { id: 3, name: "Closed" },
  ];
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Created At", dataIndex: "createdat", key: "createdat" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      name: "OPERATION",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      key: "2",
      name: "EXTERNAL HR",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      key: "3",

      name: "Sales Executive",
      description: "sales",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      name: "INTERNAL HR",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      name: "QUALITY",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    { name: "SEO", description: "", createdat: "2023-11-02", action: "Active" },
    { name: "BOE", description: "", createdat: "2023-11-02", action: "Active" },
  ]);

  const handleOk = () => {
    const nameValidate = nameValidator(name);
    const descriptionValidate = nameValidator(description);
    const ownerValidate = selectValidator(owner);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);
    setOwnerError(ownerValidate);

    if (nameValidate || descriptionValidate || ownerValidate) return;

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <TbReport size={20} />
            </div>
            <h2 className="allpage_mainheadings">Projects</h2>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="project_adduserbuttonContainer"
        >
          <button
            className="project_addbutton"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosAdd size={24} style={{ marginRight: "4px" }} /> Add Project
          </button>
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        <Col xs={24} sm={7} md={7} lg={4}>
          <CommonSelectField options={statusList} placeholder="Select status" />
        </Col>
      </Row>

      <div className="projecttable_Container">
        <CommonTable
          columns={columns}
          dataSource={dummydatas}
          scroll={{ x: 600 }}
          dataPerPage={4}
        />
      </div>

      {/* addproject modal */}
      <Modal
        title="Add Designation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button className="designation_submitbutton" onClick={handleOk}>
            Submit
          </button>,
        ]}
      >
        <CommonInputField
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
            setNameError(nameValidator(e.target.value));
          }}
          value={name}
          error={nameError}
          style={{ marginTop: "20px", marginBottom: "20px" }}
          mandatory
        />
        <CommonInputField
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionError(nameValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
          style={{ marginBottom: "20px" }}
        />
        <CommonSelectField
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
        />
      </Modal>
    </div>
  );
};

export default Project;
