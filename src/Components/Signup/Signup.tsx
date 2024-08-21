import React, { useState } from "react";
import { Row, Col } from "antd";
import logoImg from "../../assets/images/logo-re-3.png";
import CommonInputField from "../Common/CommonInputField.js";
import CommonSelectField from "../Common/CommonSelectField.js";
import {
  emailValidator,
  nameValidator,
  addressValidator,
  mobileValidator,
  selectValidator,
} from "../Common/Validation";
import "./styles.css";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const employeeRangeOptions: any[] = [
    { id: 1, name: "0-10" },
    { id: 2, name: "10-50" },
    { id: 3, name: "50-100" },
    { id: 4, name: "100-500" },
    { id: 5, name: "500-1000" },
    { id: 6, name: "1000-10000" },
  ];
  const [employeeRange, setEmployeeRange] = useState<number>();
  const [employeeRangeError, setEmployeeRangeError] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [domainError, setDomainError] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [websiteError, setWebsiteError] = useState<string>("");
  const [linkdin, setLinkdin] = useState<string>("");
  const [linkdinError, setLinkdinError] = useState<string>("");

  const handleName = (event: any) => {
    setName(event.target.value);
    setNameError(nameValidator(event.target.value));
  };

  const handleCreate = (event: any) => {
    event.preventDefault();
    console.log("rangeee", employeeRange, employeeRangeError);
    const nameValidate: string = nameValidator(name);
    const emailValidate: string = emailValidator(email);
    const mobileValidate: string = mobileValidator(mobile);
    const addressValidate: string = addressValidator(address);
    const employeerangeValidate: string = selectValidator(employeeRange);
    const domainValidate: string = addressValidator(domain);
    const websiteValidate: string = addressValidator(website);
    const linkdinValidate: string = addressValidator(linkdin);

    setNameError(nameValidate);
    setEmailError(emailValidate);
    setMobileError(mobileValidate);
    setAddressError(addressValidate);
    setEmployeeRangeError(employeerangeValidate);
    setDomainError(domainValidate);
    setWebsiteError(websiteValidate);
    setLinkdinError(linkdinValidate);

    if (
      nameValidate ||
      emailValidate ||
      mobileValidate ||
      addressValidate ||
      employeerangeValidate ||
      domainValidate ||
      websiteValidate ||
      linkdinValidate
    )
      return;
  };
  return (
    <div>
      <div className="circle" />
      <div className="login_mainContainer">
        <div className="signup_card">
          <form>
            <div className="loginlogo_container">
              <img src={logoImg} className="login_logo" />
              <p className="signup_headingtext">Create an organization</p>
            </div>
            <Row gutter={16} style={{ marginTop: "22px" }}>
              <Col span={12}>
                <CommonInputField
                  label="Name"
                  onChange={handleName}
                  value={name}
                  error={nameError}
                  mandatory={true}
                />
              </Col>
              <Col span={12}>
                <CommonInputField
                  label="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError(emailValidator(event.target.value));
                  }}
                  value={email}
                  error={emailError}
                  mandatory={true}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "22px" }}>
              <Col span={12}>
                <CommonInputField
                  label="Mobile"
                  maxLength={10}
                  onChange={(event) => {
                    setMobile(event.target.value);
                    setMobileError(mobileValidator(event.target.value));
                  }}
                  value={mobile}
                  error={mobileError}
                  mandatory={true}
                />
              </Col>
              <Col span={12}>
                <CommonInputField
                  label="Address"
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setAddressError(addressValidator(event.target.value));
                  }}
                  value={address}
                  error={addressError}
                  mandatory={true}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "22px" }}>
              <Col span={12}>
                <CommonSelectField
                  label="Employees Range"
                  options={employeeRangeOptions}
                  onChange={(value: any) => {
                    setEmployeeRange(value);
                    setEmployeeRangeError(selectValidator(value));
                  }}
                  value={employeeRange}
                  error={employeeRangeError}
                  mandatory={true}
                />
              </Col>
              <Col span={12}>
                <CommonInputField
                  label="Domain"
                  onChange={(event) => {
                    setDomain(event.target.value);
                    setDomainError(addressValidator(event.target.value));
                  }}
                  value={domain}
                  error={domainError}
                  mandatory={true}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "22px" }}>
              <Col span={12}>
                <CommonInputField
                  label="Website Url"
                  onChange={(event) => {
                    setWebsite(event.target.value);
                    setWebsiteError(addressValidator(event.target.value));
                  }}
                  value={website}
                  error={websiteError}
                  mandatory={true}
                />
              </Col>
              <Col span={12}>
                <CommonInputField
                  label="Linkdin Url"
                  onChange={(event) => {
                    setLinkdin(event.target.value);
                    setLinkdinError(addressValidator(event.target.value));
                  }}
                  value={linkdin}
                  error={linkdinError}
                  mandatory={true}
                />
              </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="signup_createbutton"
                type="submit"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom_circle" />
    </div>
  );
}
