import React, { useState } from "react";
import { Row, Col, Table, Modal, Select, Space } from "antd";
import { IoIosAdd } from "react-icons/io";
import CommonSearchField from "../../../components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../components/Common/CommonInputField";
import {
  breakTimeValidator,
  nameValidator,
} from "../../../components/Common/Validation";
import CommonSelectField from "../../../components/Common/CommonSelectField";

export default function Break() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [breaktime, setBreakTime] = useState("");
  const [breaktimeError, setBreakTimeError] = useState("");
  const [team, setTeam] = useState("");
  const teamList = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Tester" },
  ];
  const columns = [
    { title: "Break Name", dataIndex: "name", key: "name" },
    { title: "Max Break Time", dataIndex: "maxbreaktime", key: "maxbreaktime" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (record) => (
        <div className="breakstatus_container">
          <p>Active</p>
        </div>
      ),
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      name: "Morning Break",
      maxbreaktime: "15",
      status: "Active",
    },
    {
      key: "2",
      name: "Lunch Break",
      maxbreaktime: "30",
      status: "Active",
    },
    {
      key: "3",
      name: "Evening Break",
      maxbreaktime: "15",
      status: "Active",
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
    {
      key: "1",
      name: "Morning Break",
      maxbreaktime: "15",
      status: "Active",
    },
    {
      key: "2",
      name: "Lunch Break",
      maxbreaktime: "30",
      status: "Active",
    },
    {
      key: "3",
      name: "Evening Break",
      maxbreaktime: "15",
      status: "Active",
    },
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

  const handleTeamChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleOk = () => {
    const nameValidate = nameValidator(name);
    const breaktimeValidate = breakTimeValidator(breaktime);

    setNameError(nameValidate);
    setBreakTime(breaktimeValidate);

    if (nameValidate || breaktimeValidate) return;

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
        <Col span={12}>
          <CommonSearchField
            placeholder="Search break..."
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
            <IoIosAdd size={24} style={{ marginRight: "6px" }} /> Add Break
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

      {/* addrole modal */}
      <Modal
        title="Add Break"
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
          label="Max Break Time"
          onChange={(e) => {
            setBreakTime(e.target.value);
            setBreakTimeError(breakTimeValidator(e.target.value));
          }}
          value={breaktime}
          error={breaktimeError}
          style={{ marginTop: "20px", marginBottom: "20px" }}
          mandatory
        />

        <CommonSelectField
          mode="multiple"
          allowClear
          label="Add team filter"
          placeholder="Please select"
          onChange={handleTeamChange}
          options={teamList}
          variant="filled"
        />
        {/* <CommonInputField
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionError(nameValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
        /> */}
      </Modal>
    </div>
  );
}
