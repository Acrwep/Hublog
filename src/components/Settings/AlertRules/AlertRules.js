import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonInputField from "../../../Components/Common/CommonInputField";
import {
  breakTimeValidator,
  nameValidator,
  selectValidator,
} from "../../../Components/Common/Validation";
import CommonSelectField from "../../../Components/Common/CommonSelectField";

export default function AlertRules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [alertThreshold, setAlertThreshold] = useState(null);
  const [alertThresholdError, setAlertThresholdError] = useState("");
  const [punchoutThreshold, setPunchoutThreshold] = useState(null);
  const [punchoutThresholdError, setPunchoutThresholdError] = useState("");
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "In Active" },
  ];
  const [status, setStatus] = useState(false);
  const [statusError, setStatusError] = useState("");
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: 140 },
    {
      title: "Alert Threshold",
      dataIndex: "threshold",
      key: "threshold",
      width: 150,
      render: (text) => {
        return <p>{`${text} min`}</p>;
      },
    },
    {
      title: "Auto Punchout Threshold",
      dataIndex: "punchoutthreshold",
      key: "punchoutthreshold",
      width: 210,
      render: (text) => {
        return <p>{`${text} min`}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text) => {
        if (text === 1) {
          return (
            <div className="logsreport_mappingActivetextContainer">
              <p>Active</p>
            </div>
          );
        } else {
          return (
            <div className="logsreport_statusInActivetextContainer">
              <p>In Active</p>
            </div>
          );
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      render: (text, record) => {
        return (
          <AiOutlineEdit
            size={20}
            className="alertrules_tableeditbutton"
            onClick={() => handleModal(record)}
          />
        );
      },
    },
  ];
  const [dummydatas, setDummyDatas] = useState([
    {
      key: "1",
      name: "Inactivity",
      threshold: 10,
      punchoutthreshold: 30,
      status: 1,
    },
  ]);

  const [duplicateDummydatas, setDuplicateDummyDatas] = useState([
    {
      key: "1",
      name: "Application",
      type: "Overtime Break",
      createdat: "2023-11-02",
      action: "Active",
    },
    {
      key: "2",
      name: "URL",
      type: "Inactivity",
      createdat: "2023-11-02",
      action: "Active",
    },
  ]);

  const handleModal = (record) => {
    setName(record.name);
    setAlertThreshold(record.threshold);
    setPunchoutThreshold(record.punchoutthreshold);
    setStatus(record.status);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setName("");
    setNameError("");
    setAlertThreshold(null);
    setAlertThresholdError("");
    setPunchoutThreshold(null);
    setPunchoutThresholdError("");
    setStatus("");
    setStatusError("");
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const nameValidate = nameValidator(name);
    const alertValidate = breakTimeValidator(alertThreshold);
    const punchoutValidate = breakTimeValidator(punchoutThreshold);
    const statusValidate = selectValidator(status);

    setNameError(nameValidate);
    setAlertThresholdError(alertValidate);
    setPunchoutThresholdError(punchoutValidate);
    setStatusError(statusValidate);

    if (nameValidate || alertValidate || punchoutValidate || statusValidate)
      return;

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    handleReset();
  };
  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      setDummyDatas(duplicateDummydatas);
      return;
    }
    const filterData = dummydatas.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log("filter", filterData);
    setDummyDatas(filterData);
  };

  return (
    <div>
      <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CommonSearchField
            placeholder="Search alert rules..."
            onSearch={handleSearch}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="designion_adduserbuttonContainer"
        ></Col>
      </Row>

      <CommonTable
        columns={columns}
        dataSource={dummydatas}
        scroll={{ x: 650 }}
        checkBox="false"
        dataPerPage={4}
        paginationStatus={false}
      />
      {/* addalert modal */}
      <Modal
        title="Edit Inactivity Alert Rules"
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
          style={{ marginTop: "12px" }}
          mandatory
        />
        <CommonInputField
          label="Alert threshold duration"
          onChange={(e) => {
            setAlertThreshold(e.target.value);
            setAlertThresholdError(breakTimeValidator(e.target.value));
          }}
          value={alertThreshold}
          error={alertThresholdError}
          suffix="min"
          type="number"
          style={{ marginTop: "22px" }}
          mandatory
        />
        <CommonInputField
          label="Auto punchout threshold duration"
          onChange={(e) => {
            setPunchoutThreshold(e.target.value);
            setPunchoutThresholdError(breakTimeValidator(e.target.value));
          }}
          value={punchoutThreshold}
          error={punchoutThresholdError}
          suffix="min"
          type="number"
          style={{ marginTop: "22px" }}
          mandatory
        />
        <CommonSelectField
          label="Status"
          onChange={(value) => {
            setStatus(value);
            setStatusError(selectValidator(value));
          }}
          options={statusList}
          value={status}
          error={statusError}
          style={{ marginTop: "22px" }}
          mandatory
        />
      </Modal>
    </div>
  );
}
