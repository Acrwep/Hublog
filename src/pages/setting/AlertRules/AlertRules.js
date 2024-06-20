import React, { useState } from "react";
import { Row, Col, Table, Modal } from "antd";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import CommonSearchField from "../../../components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../components/Common/CommonInputField";
import { nameValidator } from "../../../components/Common/Validation";
import CommonSelectField from "../../../components/Common/CommonSelectField";
import { RiDeleteBin7Line } from "react-icons/ri";

export default function AlertRules() {
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: 4,
    total: dummydatas.length,
    onChange: handlePageChange,
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

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
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "white",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 1,
  };
  return (
    <div>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col span={12}>
          <CommonSearchField
            placeholder="Search designation..."
            onSearch={handleSearch}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 9px",
          }}
        >
          <button
            className="designation_addbutton"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosAdd size={24} style={{ marginRight: "6px" }} /> Add Alert Rule
          </button>
        </Col>
      </Row>

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dummydatas}
        scroll={{ x: 600 }} // Enable horizontal scrolling
        pagination={paginationConfig}
        tableLayout="fixed" // Ensures the table layout is fixed
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
