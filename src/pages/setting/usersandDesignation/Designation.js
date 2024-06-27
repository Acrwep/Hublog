import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import { IoIosAdd } from "react-icons/io";
import CommonSearchField from "../../../components/Common/CommonSearchbar";
import "../styles.css";
import CommonTable from "../../../components/Common/CommonTable";
import CommonInputField from "../../../components/Common/CommonInputField";
import { nameValidator } from "../../../components/Common/Validation";

export default function Designation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
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
          <button
            className="designation_addbutton"
            onClick={() => setIsModalOpen(true)}
          >
            <IoIosAdd className="designationbutton_addicon" /> Add Designation
          </button>
        </Col>
      </Row>
      <CommonTable
        columns={columns}
        dataSource={dummydatas}
        scroll={{ x: 600 }}
        dataPerPage={4}
      />
      {/* adddesignation modal */}
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
        />
      </Modal>
    </div>
  );
}
