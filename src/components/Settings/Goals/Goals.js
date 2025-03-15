import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import CommonSelectField from "../../../Components/Common/CommonSelectField";
import "../styles.css";
import CommonInputField from "../../Common/CommonInputField";
import { selectValidator } from "../../Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import { createGoals, getGoals, updateGoals } from "../../APIservice.js/action";
import { useDispatch, useSelector } from "react-redux";
import { storeGoalRules } from "../../Redux/slice";

export default function Goals() {
  const dispatch = useDispatch();
  const [workingTime, setWorkingTime] = useState();
  const [productiveTime, setProductiveTime] = useState();
  const goalsRulesData = useSelector((state) => state.goalrules);
  const goalTypes = [
    { id: 1, name: "Working time" },
    { id: 2, name: "Productive time" },
  ];
  const [values, setValues] = useState([]);

  useEffect(() => {
    console.log("golasList", goalsRulesData);
    setValues(goalsRulesData);

    if (goalsRulesData && goalsRulesData.length > 0) {
      setValues([]);
      setValues(goalsRulesData);
      setWorkingTime(goalsRulesData[0].workingTime);
      setProductiveTime(goalsRulesData[0].productiveTime);
    } else {
      setValues([]);
    }
  }, [goalsRulesData]);

  const handleSubmit = async () => {
    let isChangesFound = false;
    if (values.length >= 1) {
      values.map((item) => {
        if (
          item.workingTime === workingTime &&
          item.productiveTime === productiveTime
        ) {
          isChangesFound = false;
        } else {
          isChangesFound = true;
        }
      });
    }
    console.log("check chnages", isChangesFound);
    if (isChangesFound === false) {
      CommonToaster("No changes found", "error");
      return;
    }
    const workingtimeValidate = selectValidator(workingTime);
    const productivetimeValidate = selectValidator(productiveTime);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    if (workingtimeValidate) {
      CommonToaster("working time is required", "error");
      return;
    } else if (productivetimeValidate) {
      CommonToaster("productive time is required", "error");
      return;
    }

    const payload = {
      id: values.length >= 1 ? values[0].id : "",
      organizationId: orgId,
      workingTime: workingTime,
      productiveTime: productiveTime,
    };

    try {
      const response = await updateGoals(payload);
      CommonToaster("Goal rules updated", "success");
    } catch (error) {
      CommonToaster(error?.response?.data);
    } finally {
      getGoalsData();
    }
  };

  const getGoalsData = async () => {
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getGoals(orgId);
      const golasList = response?.data;
      console.log("goals response", golasList);
      dispatch(storeGoalRules(golasList));
    } catch (error) {
      dispatch(storeGoalRules([]));
    }
  };

  return (
    <div>
      <p style={{ color: "#667085", marginTop: "6px" }}>
        Select the goal type and set the minimum daily duration (in hours/day)
        that employees should achieve to meet the goal.
      </p>
      <div className="golas_mainContainer">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10}>
            <CommonInputField
              label="Goal Type"
              mandatory
              value="Working Time"
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={10}
            className="goals_hoursfieldColumn"
          >
            <CommonInputField
              label="Set minimum working time (Hours/Day)"
              onChange={(e) => {
                setWorkingTime(e.target.value);
                if (e.target.value < 0) {
                  setWorkingTime(0);
                }
              }}
              value={workingTime}
              suffix="hrs"
              type="number"
            />
          </Col>
        </Row>

        <p style={{ marginTop: "20px", marginBottom: "20px" }}>And</p>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10}>
            <CommonInputField
              label="Goal Type"
              mandatory
              value="Productive Time"
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={10}
            className="goals_hoursfieldColumn"
          >
            <CommonInputField
              label="Set minimum productive time (Hours/Day)"
              onChange={(e) => {
                setProductiveTime(e.target.value);
                if (e.target.value < 0) {
                  setProductiveTime(0);
                }
              }}
              value={productiveTime}
              suffix="hrs"
              type="number"
            />
          </Col>
        </Row>

        {/* <button className="goals_savebutton">Save changes</button> */}
        <Button
          className="goals_savebutton"
          type="primary"
          onClick={handleSubmit}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
