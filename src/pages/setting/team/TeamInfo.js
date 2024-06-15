import { Col, Row } from "antd";
import React from "react";
import CommonSelectField from "../../../components/Common/CommonSelectField";

export default function TeamInfo() {
  const teamList = [
    { id: 1, name: "Operation" },
    { id: 2, name: "Branch Operation" },
    { id: 3, name: "Quality" },
    { id: 4, name: "SEO" },
    { id: 5, name: "Sales" },
    { id: 6, name: "Developers" },
  ];
  return (
    <div>
      <Row className="teaminfo_rowContainer">
        <Col span={12}>
          <p className="teaminfo_policyheading">Application Policy</p>
          <p style={{ color: "gray" }}>
            Please select an application policy based on{" "}
            <span style={{ color: "#25a17d" }}>Productivity Rules</span>
          </p>
        </Col>

        <Col span={12} style={{ marginTop: "10px" }}>
          <CommonSelectField options={teamList} />
        </Col>
      </Row>
    </div>
  );
}
