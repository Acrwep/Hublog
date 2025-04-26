import React, { useState, useEffect } from "react";
import { Input, Spin } from "antd";
import hublogLogo from "../../assets/images/logo-re-3.png";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import "./login.css";
import { checkDomain } from "../APIservice.js/action";
import { addressValidator } from "../Common/Validation";
import { LoadingOutlined } from "@ant-design/icons";

export default function Portal() {
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [iconVisible, setIconVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleDomain = async (e) => {
    const value = e.target.value;
    setDomain(value);

    if (iconVisible) {
      setTimeout(async () => {
        try {
          const response = await checkDomain(value);
          console.log("domain response", response);
          setDomainError("");
        } catch (error) {
          console.log("domain rror", error);
          if (error?.response?.data === "Domain name is required.") {
            setDomainError("is required");
          } else {
            setDomainError("is not valid");
          }
        }
      }, 500);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIconVisible(true);
    const domainValidate = addressValidator(domain);

    setDomainError(domainValidate);

    if (domainValidate) return;

    setButtonLoading(true);
    try {
      const response = await checkDomain(domain);
      console.log("domain response", response);
      setDomainError("");

      setTimeout(() => {
        if (process.env.NODE_ENV === "production") {
          window.location.href = `http://${domain}.workstatus.qubinex.com/login?domain=${domain}`;
        } else {
          window.location.href = `http://${domain}.localtest.me:3000/login?domain=${domain}`; //dev
        }
      }, 500);
    } catch (error) {
      console.log("domain rror", error);
      setDomainError("is not valid");
    } finally {
      setTimeout(() => {
        setButtonLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="freetrial_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />

      <div className="portal_card">
        <p className="freetrial_signuptext">Enter Your Domain</p>

        <form>
          <div className="portal_inputfielddiv">
            <Input
              className={
                domainError === ""
                  ? "portal_inputfield"
                  : "portal_errorinputfield"
              }
              type="text"
              onChange={handleDomain}
              value={domain}
            />
            <p
              className={
                iconVisible && domainError === ""
                  ? "portal_emailerror_hide"
                  : "portal_emailerror_visible"
              }
            >
              {domainError ? "Domain " + domainError : ""}
            </p>
            <FaCircleCheck
              size={19}
              color="#009737"
              className={
                iconVisible && domainError === ""
                  ? "portal_emailcheckicon_visible"
                  : "portal_emailcheckicon_hide"
              }
            />

            <FaCircleXmark
              size={19}
              color="rgb(252, 48, 52)"
              className={
                iconVisible && domainError != ""
                  ? "portal_xicon_visible"
                  : "portal_xicon_hide"
              }
            />
          </div>

          {buttonLoading ? (
            <button className="portal_loadingsubmitbutton" type="submit">
              {" "}
              <Spin
                indicator={
                  <LoadingOutlined
                    spin
                    style={{ marginRight: "8px", color: "#ffffff" }}
                  />
                }
                size="small"
              />{" "}
              Loading...
            </button>
          ) : (
            <button className="portal_submitbutton" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
