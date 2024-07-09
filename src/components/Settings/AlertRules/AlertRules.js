import React, { useState } from "react";
import { Row, Col, Table, Modal } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonInputField from "../../../Components/Common/CommonInputField";
import { nameValidator } from "../../../Components/Common/Validation";
import CommonSelectField from "../../../Components/Common/CommonSelectField";
import { RiDeleteBin7Line } from "react-icons/ri";
import CommonAddButton from "../../Common/CommonAddButton";

export default function AlertRules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [ruleType, setRuleType] = useState("");
  const ruleTypeList = [
    { id: 1, name: "Application" },
    { id: 2, name: "URL" },
    { id: 3, name: "Overtime Break" },
    { id: 4, name: "Inactivity" },
  ];
  const [team, setTeam] = useState("");
  const teamList = [
    { id: 1, name: "Developers" },
    { id: 2, name: "Testers" },
    { id: 3, name: "SEO" },
    { id: 4, name: "Marketing" },
  ];
  const [email, setEmail] = useState("");
  const emailList = [{ id: 1, name: "balaji@gmail.com" }];
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 160,
      render: (text, record) => {
        return (
          <div style={{ display: "flex" }}>
            <AiOutlineEdit size={20} className="alertrules_tableeditbutton" />
            <RiDeleteBin7Line
              size={20}
              className="alertrules_tabledeletebutton"
            />
          </div>
        );
      },
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      name: "Application",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      key: "2",
      name: "URL",
      description: "",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      key: "3",
      name: "Overtime Break",
      description: "sales",
      createdat: "2023-11-02",
      action: "Active",
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
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

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      setDummyDatas(duplicateDummydatas);
      return;
    }
    const filterData = dummydatas.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    console.log("filter", filterData);
    setDummyDatas(filterData);
  };

  return (
    <div>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CommonSearchField
            placeholder="Search designation..."
            onSearch={handleSearch}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="designion_adduserbuttonContainer"
        >
          <CommonAddButton
            name="Add Alert Rule"
            onClick={() => setIsModalOpen(true)}
          />
        </Col>
      </Row>

      <CommonTable
        columns={columns}
        dataSource={dummydatas}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
      {/* addalert modal */}
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
          label="Alert Rule Type"
          options={ruleTypeList}
          value={ruleType}
          onChange={(value) => setRuleType(value)}
          style={{ marginBottom: "20px" }}
        />
        <CommonSelectField
          label="Select Team"
          options={teamList}
          value={team}
          onChange={(value) => setTeam(value)}
          style={{ marginBottom: "20px" }}
        />
        <CommonSelectField
          label="Send Email to"
          options={emailList}
          value={email}
          onChange={(value) => setEmail(value)}
        />
      </Modal>
    </div>
  );
}
