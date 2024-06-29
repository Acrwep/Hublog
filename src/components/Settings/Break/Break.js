import React, { useState } from "react";
import { Row, Col, Modal, Select, Space } from "antd";
import { IoIosAdd } from "react-icons/io";
import CommonSearchField from "../../../components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../components/Common/CommonInputField";
import {
  breakTimeValidator,
  nameValidator,
} from "../../../components/Common/Validation";
import CommonTable from "../../../components/Common/CommonTable";
import CommonSelectField from "../../../components/Common/CommonSelectField";

export default function Break() {
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
        <Col xs={24} sm={24} md={24} lg={12}>
          <CommonSearchField
            placeholder="Search break..."
            onSearch={handleSearch}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="users_adduserbuttonContainer"
        >
          <button
            className="users_addbutton"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosAdd size={24} style={{ marginRight: "6px" }} /> Add Break
          </button>
        </Col>
      </Row>

      <CommonTable
        columns={columns}
        dataSource={dummydatas}
        scroll={{ x: 600 }}
        dataPerPage={4}
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
