import React from "react";
import { Row, Col, Switch } from "antd";
import { MdScreenshotMonitor } from "react-icons/md";
import { MdOutlineDownload } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { TbLockAccess } from "react-icons/tb";
import "../styles.css";

export default function Compliance() {
  return (
    <div>
      <Row style={{ marginTop: "7px", marginBottom: "35px" }}>
        <Col span={12} style={{ display: "flex" }}>
          <MdScreenshotMonitor size={22} style={{ marginTop: "3px" }} />
          <p className="compliance_switchNames">Screenshots Capture</p>
        </Col>
        <Col span={12} className="compliance_switchContainer">
          <Switch size={1} />
        </Col>
      </Row>
      <Row style={{ marginBottom: "35px" }}>
        <Col span={12} style={{ display: "flex" }}>
          <MdOutlineDownload size={22} style={{ marginTop: "3px" }} />
          <p className="compliance_switchNames">Screenshots Download</p>
        </Col>
        <Col span={12} className="compliance_switchContainer">
          <Switch />
        </Col>
      </Row>
      <Row style={{ marginBottom: "35px" }}>
        <Col span={12} style={{ display: "flex" }}>
          <IoLockClosedOutline size={22} style={{ marginTop: "3px" }} />
          <p className="compliance_switchNames">
            Enable screenshots end-to-end encryption
          </p>
        </Col>
        <Col span={12} className="compliance_switchContainer">
          <Switch />
        </Col>
      </Row>
      <Row style={{ marginBottom: "35px" }}>
        <Col span={12} style={{ display: "flex" }}>
          <TbLockAccess size={22} style={{ marginTop: "3px" }} />
          <p className="compliance_switchNames">Allow We360 support access</p>
        </Col>
        <Col span={12} className="compliance_switchContainer">
          <Switch />
        </Col>
      </Row>
    </div>
  );
}
