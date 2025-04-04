import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hublogLogo from "../../assets/images/logo-re-3.png";
import "./styles.css";
import { Row, Col, Checkbox, Input, Spin, Modal } from "antd";
import { Country } from "country-state-city";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import {
  descriptionValidator,
  emailValidator,
  lastNameValidator,
  mobileValidator,
  nameValidator,
  selectValidator,
  urlValidator,
} from "../Common/Validation";
import { CommonToaster } from "../Common/CommonToaster";
import { LoadingOutlined } from "@ant-design/icons";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import {
  createAlertRules,
  createDefaultAppsandUrls,
  createDefaultCategories,
  createGoals,
  createOrganization,
  createUser,
  createWellnessRules,
  getOrganizations,
} from "../APIservice.js/action";

export default function Signup() {
  const navigation = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [countryError, setCountryError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteUrlError, setWebsiteUrlError] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinUrlError, setLinkedinUrlError] = useState("");
  const [policyStatus, setPolicyStatus] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const countrylist = Country.getAllCountries();
    console.log("countrylist", countrylist);
    setCountryOptions(countrylist);
  }, []);

  const formatDateTimeIST = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
      timeZone: "Asia/Kolkata", // IST timezone
    })
      .format(date)
      .replace(",", ""); // Remove comma
  };

  const convertToBackendFormat = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    return `${year}-${month}-${day}T${timePart}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = "125jasdkjashdkas";
    // navigation(`/setpassword?token=${token}`);
    setValidationStatus(true);
    const firstNameValidate = nameValidator(firstName);
    const lastNameValidate = lastNameValidator(lastName);
    const emailValidate = emailValidator(email);
    const companyNameValidate = nameValidator(companyName);
    const countryValidate = selectValidator(countryName);
    const mobileValidate = mobileValidator(mobile);
    const domainValidate = nameValidator(domain);
    const websiteUrlValidate = urlValidator(websiteUrl);
    const linkedinUrlValidate = urlValidator(linkedinUrl);

    setFirstNameError(firstNameValidate);
    setLastNameError(lastNameValidate);
    setEmailError(emailValidate);
    setCompanyNameError(companyNameValidate);
    setCountryError(countryValidate);
    setMobileError(mobileValidate);
    setDomainError(domainValidate);
    setWebsiteUrlError(websiteUrlValidate);
    setLinkedinUrlError(linkedinUrlValidate);

    if (
      firstNameValidate ||
      lastNameValidate ||
      emailValidate ||
      companyNameValidate ||
      countryValidate ||
      mobileValidate ||
      domainValidate ||
      websiteUrlValidate ||
      linkedinUrlValidate
    )
      return;
    setButtonLoading(true);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format dates
    const todayFormatted = formatDateTimeIST(today);
    const tomorrowFormatted = formatDateTimeIST(tomorrow);

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      country: countryName,
      mobile: mobile,
      domain: domain,
      organization_Name: companyName,
      websiteUrl: websiteUrl,
      linkdinUrl: linkedinUrl,
      licence: 5,
      planName: "Freetrial",
      planStartDate: convertToBackendFormat(todayFormatted),
      planEndDate: convertToBackendFormat(tomorrowFormatted),
      paidAmount: 0.0,
      subject: "Welcome to Hublog!",
    };

    console.log("payload", payload);
    try {
      await createOrganization(payload);
      getOrganizationData();
    } catch (error) {
      CommonToaster(error?.response?.data, "error");
      setButtonLoading(false);
    }
  };

  const getOrganizationData = async () => {
    let lastItem;
    try {
      const response = await getOrganizations();
      const organizationDatas = response?.data;
      lastItem = organizationDatas[organizationDatas.length - 1];
      console.log("last organization", lastItem);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createAdmin(lastItem.id);
      }, 300);
    }
  };

  const createAdmin = async (orgId) => {
    const request = {
      first_Name: firstName,
      last_Name: lastName,
      email: email,
      phone: mobile,
      usersName: firstName + lastName,
      organizationId: parseInt(orgId),
      roleId: 2,
      active: true,
      subject: "Welcome to Hublog!",
    };
    try {
      await createUser(request);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createWellness(orgId);
      }, 350);
    }
  };

  const createWellness = async (orgId) => {
    const payload = {
      organizationId: orgId,
      underutilized: 3,
      healthy: 9,
      overburdened: 24,
    };
    try {
      await createWellnessRules(payload);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createImbuildAppsAndUrls(orgId);
      }, 300);
    }
  };

  const createImbuildAppsAndUrls = async (orgId) => {
    try {
      await createDefaultAppsandUrls(orgId);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createAlertSettings(orgId);
      }, 300);
    }
  };

  const createAlertSettings = async (orgId) => {
    const request = {
      break_alert_status: true,
      alertThreshold: 30,
      punchoutThreshold: 60,
      organizationId: orgId,
      status: true,
    };

    try {
      await createAlertRules(request);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createGoalsSettings(orgId);
      }, 300);
    }
  };

  const createGoalsSettings = async (orgId) => {
    const payload = {
      organizationId: orgId,
      workingTime: 8,
      productiveTime: 6,
    };

    try {
      await createGoals(payload);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        createCategoriesSettings(orgId);
      }, 300);
    }
  };

  const createCategoriesSettings = async (orgId) => {
    try {
      await createDefaultCategories(orgId);
      setIsModalOpen(true);
    } catch (error) {
      CommonToaster("Unable to create. Try again later", "error");
    } finally {
      setTimeout(() => {
        formReset();
      }, 300);
    }
  };

  const formReset = () => {
    setButtonLoading(false);
    setValidationStatus(false);
    setFirstName("");
    setFirstNameError("");
    setLastName("");
    setLastNameError("");
    setEmail("");
    setEmailError("");
    setCompanyName("");
    setCompanyNameError("");
    setCountryName("");
    setCountryError("");
    setMobile("");
    setMobileError("");
    setWebsiteUrl("");
    setWebsiteUrlError("");
    setLinkedinUrl("");
    setLinkedinUrlError("");
    setDomain("");
    setDomainError("");
  };

  return (
    <div className="freetrial_maincontainer">
      <img src={hublogLogo} className="freetrial_hubloglogo" />

      <div className="freetrial_card">
        <p
          className="freetrial_signuptext"
          onClick={() => setIsModalOpen(true)}
        >
          Sign Up
        </p>
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
              value={countryName}
              onChange={(value) => {
                setCountryName(value);
                console.log(value);
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
              label="Phone"
              mandatory
              className="freetrial_formfields"
              value={mobile}
              maxLength={10}
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

        <Row gutter={16} style={{ marginTop: "22px" }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <CommonInputField
              label="Website url"
              mandatory
              className="freetrial_formfields"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);
                if (validationStatus) {
                  setWebsiteUrlError(urlValidator(e.target.value));
                }
              }}
              error={websiteUrlError}
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
              label="Linkedin url"
              mandatory
              className="freetrial_formfields"
              value={linkedinUrl}
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
                if (validationStatus) {
                  setLinkedinUrlError(urlValidator(e.target.value));
                }
              }}
              error={linkedinUrlError}
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
          {buttonLoading ? (
            <button className="loadingfreetrial_submitbutton">
              <Spin
                indicator={
                  <LoadingOutlined
                    spin
                    style={{ marginRight: "4px", color: "#ffffff" }}
                  />
                }
                size="small"
              />{" "}
              Please wait, this may take a while
            </button>
          ) : (
            <button className="freetrial_submitbutton" onClick={handleSubmit}>
              Start free trial
            </button>
          )}
        </div>
      </div>

      <Modal
        title={false}
        open={isModalOpen}
        closeIcon={false}
        footer={[
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="signup_modalokbutton"
              onClick={() => setIsModalOpen(false)}
            >
              Ok
            </button>
          </div>,
        ]}
        centered
      >
        <div className="signup_successmodalContainer">
          <IoMdCheckmarkCircleOutline size={45} color="#009737" />
          <p className="signupmodal_successheading">SUCCESS</p>

          <div className="signup_modalcontentContainer">
            <p className="signupmodal_contentheading">
              Account Created Successfully!
            </p>
            <p className="signup_modalcontent">
              Your account has been created! Please verify your email and set
              your password to get started.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
