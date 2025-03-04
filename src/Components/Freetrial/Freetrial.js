import React, { useState, useEffect } from "react";
import hublogLogo from "../../assets/images/logo-re-3.png";
import "./styles.css";
import { Row, Col, Checkbox, Input } from "antd";
import { Country } from "country-state-city";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import {
  emailValidator,
  lastNameValidator,
  mobileValidator,
  nameValidator,
  selectValidator,
} from "../Common/Validation";

export default function Freetrial() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [countryError, setCountryError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [policyStatus, setPolicyStatus] = useState(false);
  const [validationStatus, setValidationStatus] = useState(false);

  useEffect(() => {
    const countrylist = Country.getAllCountries();
    console.log("countrylist", countrylist);
    setCountryOptions(countrylist);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstNameValidate = nameValidator(firstName);
    const lastNameValidate = lastNameValidator(lastName);
    const emailValidate = emailValidator(email);
    const companyNameValidate = nameValidator(companyName);
    const countryValidate = selectValidator(countryId);
    const mobileValidate = mobileValidator(mobile);
    const domainValidate = nameValidator(domain);

    setFirstNameError(firstNameValidate);
    setLastNameError(lastNameValidate);
    setEmailError(emailValidate);
    setCompanyNameError(companyNameValidate);
    setCountryError(countryValidate);
    setMobileError(mobileValidate);
    setDomainError(domainValidate);

    if (
      firstNameValidate ||
      lastNameValidate ||
      emailValidate ||
      companyNameValidate ||
      countryValidate ||
      mobileValidate ||
      domainValidate
    )
      return;
  };

  return (
    <div className="freetrial_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />

      <div className="freetrial_card">
        <p className="freetrial_signuptext">Sign Up</p>
        <Row gutter={16} style={{ marginTop: "16px" }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CommonInputField
              label="First name"
              mandatory
              className="freetrial_formfields"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (validationStatus) {
                  setFirstNameError(nameValidator(e.target.value));
                }
              }}
              error={firstNameError}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="freetrial_rightcolContainer"
          >
            <CommonInputField
              label="Last name"
              mandatory
              className="freetrial_formfields"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (validationStatus) {
                  setLastNameError(lastNameValidator(e.target.value));
                }
              }}
              error={lastNameError}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CommonInputField
              label="Email"
              mandatory
              className="freetrial_formfields"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationStatus) {
                  setEmailError(emailValidator(e.target.value));
                }
              }}
              error={emailError}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="freetrial_rightcolContainer"
          >
            <CommonInputField
              label="Company Name"
              mandatory
              className="freetrial_formfields"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (validationStatus) {
                  setCompanyNameError(nameValidator(e.target.value));
                }
              }}
              error={companyNameError}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CommonSelectField
              label="Country"
              options={countryOptions}
              mandatory
              className="freetrial_formfields"
              value={countryId}
              onChange={(value) => {
                setCountryId(value);
                if (validationStatus) {
                  setCountryError(selectValidator(value));
                }
              }}
              error={countryError}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="freetrial_mobilerightcolContainer"
          >
            <CommonInputField
              label="Mobile"
              mandatory
              className="freetrial_formfields"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (validationStatus) {
                  setMobileError(mobileValidator(e.target.value));
                }
              }}
              error={mobileError}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "22px" }}>
          <Col span={24}>
            <p className="productdemo_companyheadcountlabel">
              Domain <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            </p>
            <Input
              addonBefore="https://"
              addonAfter=".hublog.org"
              className="freetrial_domainformfield"
              onChange={(e) => {
                setDomain(e.target.value);
                if (validationStatus) {
                  setDomainError(nameValidator(e.target.value));
                }
              }}
              value={domain}
              status={domainError ? "error" : ""}
            />
            {domainError && (
              <p className="productdemo_employeecounterror">
                {"Domain" + " " + domainError}
              </p>
            )}
          </Col>
        </Row>

        <div className="freetrial_checkboxContainer">
          <Checkbox />
          <p className="freetrial_agreetext">
            I agree to the privacy policy and terms & conditions, and to receive
            marketing emails, newsletters, and product updates, with the option
            to unsubscribe anytime.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="freetrial_submitbutton" onClick={handleSubmit}>
            Start free trial
          </button>
        </div>
      </div>
    </div>
  );
}
