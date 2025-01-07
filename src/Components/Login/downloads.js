import React from "react";
import logoImg from "../../assets/images/logo-re-3.png";
import "./login.css";
import { Button } from "antd";

export default function Downloads() {
  return (
    <div className="downloads_mainContainer">
      <div className="downloads_card">
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
              Download Hublog .exe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
