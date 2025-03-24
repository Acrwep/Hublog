import React from "react";
import logoImg from "../../assets/images/logo-re-3.png";
import Download from "../../assets/images/Download-amico.png";
import { FaWindows } from "react-icons/fa6";
import "./login.css";
import { Button, Col, Row } from "antd";

export default function Downloads() {
  return (
    <div className="downloads_mainContainer">
      {/* <div className="downloads_card">
        <div className="dowloadslogo_container">
          <img src={logoImg} className="login_logo" />
          <p className="downloads_heading">Download the Hublog App</p>
        </div>

        <div className="downloads_contentcontainer">
          <p className="downloads_content">
            Boosting your productivity is as easy as downloading an app. Pick
            your preferred platform to begin:
          </p>

          <div>
            <Button
              className="exedownload_button"
              href="https://hublog.org:8087/Hublog-v1.2.1.exe"
              download
            >
              <FaWindows color="#ffffff" size={19} />
              Download Hublog
            </Button>
          </div>
        </div>
      </div> */}
      <Row>
        <Col span={8}>
          <div className="downloads_leftcard" />
        </Col>
        <Col span={16} style={{ backgroundColor: "rgb(128 128 128 / 13%)" }}>
          <div className="downloads_rightCurve"></div>
        </Col>
      </Row>

      <div className="downloadcard_container">
        <Row gutter={16}>
          <Col span={12}>
            <div className="downloads_cardleftContainer">
              <img src={logoImg} className="login_logo" />
              <div className="downloads_textContainer">
                <p className="downloads_downloadtext">Download Our App</p>
                <p className="downloads_content">
                  Boosting your productivity is as easy as downloading an app.
                  Pick your preferred platform to begin:
                </p>

                <Button
                  className="exedownload_button"
                  href="https://hublog.org:8087/Hublog-v1.2.2.exe"
                  download
                >
                  <FaWindows color="#ffffff" size={19} />
                  Download Now
                </Button>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Download} className="downloads_downloadimg" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
