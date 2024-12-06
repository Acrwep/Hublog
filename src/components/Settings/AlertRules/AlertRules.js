import React, { useEffect, useState } from "react";
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
  const [alertThreshold, setAlertThreshold] = useState(null);
  const [punchoutThreshold, setPunchoutThreshold] = useState(null);
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "In Active" },
  ];
  const [status, setStatus] = useState(1);
  const breakStatusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "In Active" },
  ];
  const [breakStatus, setBreakStatus] = useState(1);
  const [inactivityId, setInactivityId] = useState();
  const [alertRulesList, setAlertRulesList] = useState([]);

  useEffect(() => {
    getAlertRulesData();
  }, []);

  const getAlertRulesData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getAlertRules(orgId);
      console.log("alertrules response", response.data);
      const alertrulesData = response.data;
      if (alertrulesData.length >= 1) {
        setAlertRulesList(alertrulesData);
        setInactivityId(alertrulesData[0].id);
        setBreakStatus(alertrulesData[0].break_alert_status === true ? 1 : 2);
        setAlertThreshold(alertrulesData[0].alertThreshold);
        setPunchoutThreshold(alertrulesData[0].punchoutThreshold);
        setStatus(alertrulesData[0].status === true ? 1 : 2);
        dispatch(storeAlertRules(alertrulesData));
      } else {
        setInactivityId(null);
        setBreakStatus(1);
        setAlertThreshold(null);
        setPunchoutThreshold(null);
        setStatus(1);
        setAlertRulesList([]);
      }
    } catch (error) {
      dispatch(storeAlertRules([]));
      CommonToaster(error?.response?.data?.message, "error");
    }
  };

  const handleOk = async () => {
    const breakStatusValidate = selectValidator(breakStatus);
    const alertValidate = breakTimeValidator(alertThreshold);
    const punchoutValidate = breakTimeValidator(punchoutThreshold);
    const statusValidate = selectValidator(status);

    if (breakStatusValidate) {
      CommonToaster("Break Alert Status is required", "error");
      return;
    } else if (alertValidate) {
      CommonToaster("Inactivity Alert Threshold Duration is required", "error");
      return;
    } else if (punchoutValidate) {
      CommonToaster("Inactivity Autopunchout Threshold is required", "error");
      return;
    } else if (statusValidate) {
      CommonToaster("Inactivity Alert Status is required", "error");
      return;
    }

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      break_alert_status: breakStatus === 1 ? true : false,
      alertThreshold: parseInt(alertThreshold),
      punchoutThreshold: punchoutThreshold,
      organizationId: orgId,
      status: status === 1 ? true : false,
      id: inactivityId,
    };

    try {
      const response = await updateAlertRules(request);
      console.log("alertrules update response", response);
      CommonToaster("Alert rule updated", "success");
      getAlertRulesData();
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
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
              <p className="setting_alertrules_heading">Alert Rules</p>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className="designion_adduserbuttonContainer"
            ></Col>
          </Row>

          {alertRulesList.length >= 1 && (
            <>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <CommonSelectField
                    label="Break Alert Status"
                    onChange={(value) => {
                      setBreakStatus(value);
                    }}
                    options={breakStatusList}
                    value={breakStatus}
                    style={{ width: "270px" }}
                    mandatory
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  className="alertrules_fieldsContainer"
                >
                  <CommonInputField
                    label="Inactivity Alert Threshold Duration"
                    onChange={(e) => {
                      setAlertThreshold(e.target.value);
                    }}
                    value={alertThreshold}
                    suffix="min"
                    type="number"
                    style={{ width: "270px" }}
                    mandatory
                  />
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <CommonInputField
                    label="Inactivity Autopunchout Threshold"
                    onChange={(e) => {
                      setPunchoutThreshold(e.target.value);
                    }}
                    value={punchoutThreshold}
                    suffix="min"
                    type="number"
                    style={{ width: "270px" }}
                    mandatory
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  className="alertrules_fieldsContainer"
                >
                  <CommonSelectField
                    label="Inactivity Alert Status"
                    onChange={(value) => {
                      setStatus(value);
                    }}
                    options={statusList}
                    value={status}
                    style={{ width: "270px" }}
                  />
                </Col>
              </Row>
              <button
                className="alertrules_savechangesbutton"
                onClick={handleOk}
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
