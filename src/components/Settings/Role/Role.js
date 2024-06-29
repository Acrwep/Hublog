import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import { IoIosAdd } from "react-icons/io";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../Components/Common/CommonInputField";
import { nameValidator } from "../../../Components/Common/Validation";

export default function Role() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Administrative privileges",
      dataIndex: "administrativeprivileges",
      key: "administrativeprivileges",
      width: 220,
    },
    {
      title: "Denied Modules",
      dataIndex: "deniedmodules",
      key: "deniedmodules",
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      name: "Developer",
      description: "Lorem ipsum dolor",
    },
    {
      key: "2",
      name: "Tester",
      description: "Lorem ipsum dolor",
    },
    {
      key: "3",
      name: "Sales Executive",
      description: "Lorem ipsum dolor",
    },
    {
      name: "HR",
      description: "Lorem ipsum dolor",
    },
    {
      name: "Manager",
      description: "Lorem ipsum dolor sit",
    },
    { name: "SEO", description: "" },
    {
      name: "BPO",
      description: "Lorem ipsum dolor sit",
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
    {
      key: "1",
      name: "OPERATION",
      description: "",
    },
    {
      key: "2",
      name: "EXTERNAL HR",
      description: "",
    },
    {
      key: "3",
      name: "Sales Executive",
      description: "sales",
    },
    {
      name: "INTERNAL HR",
      description: "",
    },
    {
      name: "QUALITY",
      description: "",
    },
    { name: "SEO", description: "" },
    { name: "BOE", description: "" },
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
            placeholder="Search role..."
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
            <IoIosAdd size={24} style={{ marginRight: "6px" }} /> Add Role
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
        title="Add Role"
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
        />
      </Modal>
    </div>
  );
}
