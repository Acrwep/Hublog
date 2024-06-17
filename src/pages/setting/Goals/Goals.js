import React from "react";
import { Row, Col } from "antd";
import CommonSelectField from "../../../components/Common/CommonSelectField";
import CommonInputAfterImage from "../../../components/Common/CommonInputAfterImage";
import "../styles.css";

export default function Goals() {
  const goalTypes = [
    { id: 1, name: "Active time" },
    { id: 2, name: "Productive time" },
  ];
  return (
    <div>
      <p style={{ color: "#667085", marginTop: "6px" }}>
        Select the goal type and set the minimum daily duration (in hours/day)
        that employees should achieve to meet the goal.
      </p>
      <div className="golas_mainContainer">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10}>
            <CommonSelectField
              options={goalTypes}
              label="Goal Type"
              mandatory
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={10}
            className="goals_hoursfieldColumn"
          >
            <CommonInputAfterImage
              label="Set minimum active time (Hours/Day)"
              addonAfter="hours"
              addonAfterStyle={{ width: "50px" }}
            />
          </Col>
        </Row>

        <p style={{ marginTop: "20px", marginBottom: "20px" }}>And</p>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={10}>
            <CommonSelectField
              options={goalTypes}
              label="Goal Type"
              mandatory
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={10}
            className="goals_hoursfieldColumn"
          >
            <CommonInputAfterImage
              label="Set minimum active time (Hours/Day)"
              addonAfter="hours"
              addonAfterStyle={{ width: "50px" }}
            />
          </Col>
        </Row>

        <button className="goals_savebutton">Save changes</button>
      </div>
    </div>
  );
}
