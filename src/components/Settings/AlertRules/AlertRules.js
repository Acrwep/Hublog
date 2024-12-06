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
import CommonAddButton from "../../Common/CommonAddButton";
import {
  createAlertRules,
  getAlertRules,
  updateAlertRules,
} from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import { useDispatch, useSelector } from "react-redux";
import { storeAlertRules } from "../../Redux/slice";
import Loader from "../../Common/Loader";

export default function AlertRules({ loading }) {
  const dispatch = useDispatch();
  const alertRulesList = useSelector((state) => state.alertrules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(null);
  const [alertThresholdError, setAlertThresholdError] = useState("");
  const [punchoutThreshold, setPunchoutThreshold] = useState(null);
  const [punchoutThresholdError, setPunchoutThresholdError] = useState("");
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "In Active" },
  ];
  const [status, setStatus] = useState(1);
  const [statusError, setStatusError] = useState("");
  const breakStatusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "In Active" },
  ];
  const [breakStatus, setBreakStatus] = useState(1);
  const [breakStatusError, setBreakStatusError] = useState("");
  const [inactivityId, setInactivityId] = useState();
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const columns = [
    {
      title: "Break Alert Status",
      dataIndex: "break_alert_status",
      key: "break_alert_status",
      width: 140,
      render: (text) => {
        if (text === true) {
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
      title: "Inactivity Alert Threshold",
      dataIndex: "alertThreshold",
      key: "alertThreshold",
      width: 190,
      render: (text) => {
        return <p>{`${text} mins`}</p>;
      },
    },
    {
      title: "Inactivity Auto Punchout Threshold",
      dataIndex: "punchoutThreshold",
      key: "punchoutThreshold",
      width: 210,
      render: (text) => {
        return <p>{`${text} mins`}</p>;
      },
    },
    {
      title: "Inactivity Alert Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (text) => {
        if (text === true) {
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
    setBreakStatus(record.break_alert_status === true ? 1 : 2);
    setAlertThreshold(record.alertThreshold);
    setPunchoutThreshold(record.punchoutThreshold);
    setStatus(record.status === true ? 1 : 2);
    setEdit(true);
    setInactivityId(record.id);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setBreakStatus(1);
    setBreakStatusError("");
    setAlertThreshold(null);
    setAlertThresholdError("");
    setPunchoutThreshold(null);
    setPunchoutThresholdError("");
    setStatus(1);
    setStatusError("");
    setEdit(false);
    setInactivityId();
    setIsModalOpen(false);
  };

  const getAlertRulesData = async () => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getAlertRules(orgId);
      console.log("alertrules response", response.data);
      const alertrulesData = response.data;
      dispatch(storeAlertRules(alertrulesData));
    } catch (error) {
      dispatch(storeAlertRules([]));
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 1000);
    }
  };

  const handleOk = async () => {
    const breakStatusValidate = selectValidator(breakStatus);
    const alertValidate = breakTimeValidator(alertThreshold);
    const punchoutValidate = breakTimeValidator(punchoutThreshold);
    const statusValidate = selectValidator(status);

    setBreakStatusError(breakStatusValidate);
    setAlertThresholdError(alertValidate);
    setPunchoutThresholdError(punchoutValidate);
    setStatusError(statusValidate);

    if (
      breakStatusValidate ||
      alertValidate ||
      punchoutValidate ||
      statusValidate
    )
      return;

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      break_alert_status: breakStatus === 1 ? true : false,
      alertThreshold: parseInt(alertThreshold),
      punchoutThreshold: punchoutThreshold,
      organizationId: orgId,
      status: status === 1 ? true : false,
      ...(edit && { id: inactivityId }),
    };

    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateAlertRules(request);
        console.log("alertrules update response", response);
        CommonToaster("Alert rule updated", "success");
        handleReset();
        getAlertRulesData();
      } catch (error) {
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    } else {
      setTableLoading(true);
      try {
        const response = await createAlertRules(request);
        console.log("alertrule response", response);
        CommonToaster("Alert rule created", "success");
        handleReset();
        getAlertRulesData();
      } catch (error) {
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    }
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <CommonSearchField
            placeholder="Search alert rules..."
            onSearch={handleSearch}
          /> */}
              <p className="setting_alertrules_heading">Alert Rules</p>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className="designion_adduserbuttonContainer"
            >
              {alertRulesList.length < 1 && (
                <CommonAddButton
                  name="Add Alert Rule"
                  onClick={() => setIsModalOpen(true)}
                />
              )}
            </Col>
          </Row>

          <CommonTable
            columns={columns}
            dataSource={alertRulesList}
            scroll={{ x: 950 }}
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
            {/* <CommonInputField
              label="Name"
              onChange={(e) => {
                setName(e.target.value);
                setNameError(nameValidator(e.target.value));
              }}
              value={name}
              error={nameError}
              style={{ marginTop: "12px" }}
              mandatory
            /> */}
            <CommonSelectField
              label="Break Alert Status"
              onChange={(value) => {
                setBreakStatus(value);
                setBreakStatusError(selectValidator(value));
              }}
              options={breakStatusList}
              value={breakStatus}
              error={breakStatusError}
              style={{ marginTop: "22px" }}
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
      )}
    </>
  );
}
