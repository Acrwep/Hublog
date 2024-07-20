import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "antd";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../Components/Common/CommonInputField";
import { descriptionValidator } from "../../../Components/Common/Validation";
import CommonAddButton from "../../Common/CommonAddButton";
import { createRole, getRole, updateRole } from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";

export default function Role() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleId, setroleId] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
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
  const [data, setData] = useState([]);
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    getRoleData();
  }, []);

  const getRoleData = async () => {
    setLoading(true);
    try {
      const response = await getRole();
      console.log("role response", response.data);
      setData(response.data);
      // setDummyData(response.data);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setIsModalOpen(false);
    setEdit(false);
  };

  const handleOk = async () => {
    const nameValidate = descriptionValidator(name);
    const descriptionValidate = descriptionValidator(description);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;

    const request = {
      Name: name,
      Description: description,
      Active: true,
      OrganizationId: 1,
      ...(edit && { id: roleId }),
    };
    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateRole(request);
        console.log("role update response", response);
        CommonToaster("Role updated successfully", "success");
        getRoleData();
        formReset();
      } catch (error) {
        console.log("update role error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    } else {
      try {
        setTableLoading(true);
        const response = await createRole(request);
        console.log("role create response", response);
        CommonToaster("Role created successfully", "success");
        getRoleData();
        formReset();
      } catch (error) {
        console.log("role error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    }
  };

  const handleCancel = () => {
    formReset();
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      setData(dummyData);
      return;
    }
    const filterData = data.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    console.log("filter", filterData);
    setData(filterData);
  };
  return (
    <div>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <CommonSearchField
            placeholder="Search role..."
            onSearch={handleSearch}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="users_adduserbuttonContainer"
        >
          <CommonAddButton
            name="Add Role"
            onClick={() => setIsModalOpen(true)}
          />
        </Col>
      </Row>

      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 600 }}
        dataPerPage={10}
        loading={tableLoading}
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
            setNameError(descriptionValidator(e.target.value));
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
            setDescriptionError(descriptionValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
        />
      </Modal>
    </div>
  );
}
