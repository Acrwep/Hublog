import React, { useState } from "react";
import "./styles.css";
import { Col, Row, Calendar, Radio } from "antd";
import hublogLogo from "../../assets/images/logo-re-3.png";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import moment from "moment";
import CommonInputField from "../Common/CommonInputField";
import CommonTextArea from "../Common/CommonTextArea";
import { IoArrowBackOutline } from "react-icons/io5";
import { dayJs } from "../Utils";
import {
  descriptionValidator,
  emailValidator,
  mobileValidator,
  nameValidator,
  selectValidator,
} from "../Common/Validation";

export default function Productdemo() {
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyEmailError, setCompanyEmailError] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyPhoneError, setCompanyPhoneError] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [employeeCountError, setEmployeeCountError] = useState("");
  const [description, setDescription] = useState("");
  const [validationTrigger, setValidationTrigger] = useState(false);

  const timingOptions = [
    { id: 1, name: "7:30am" },
    { id: 2, name: "8:15am" },
    { id: 3, name: "9:00am" },
    { id: 4, name: "11:00am" },
    { id: 5, name: "11:45am" },
    { id: 6, name: "12:30pm" },
    { id: 7, name: "1:12pm" },
    { id: 8, name: "3:00pm" },
    { id: 9, name: "3:45pm" },
    { id: 10, name: "4:30pm" },
    { id: 11, name: "5:15pm" },
    { id: 12, name: "5:45pm" },
    { id: 13, name: "6:15pm" },
  ];

  const CompanyHeadcountOptions = [
    { id: 1, label: "Self-employed", value: "Self-employed" },
    { id: 2, label: "1-10", value: "1-10" },
    { id: 3, label: "11-50", value: "11-50" },
    { id: 4, label: "51-200", value: "51-200" },
    { id: 5, label: "201-500", value: "201-500" },
    { id: 6, label: "501-1000", value: "501-1000" },
    { id: 7, label: "1001-5000", value: "1001-5000" },
    { id: 8, label: "5000-10000", value: "5000-10000" },
    { id: 9, label: "10000+", value: "10000+" },
  ];

  const disabledDate = (current) => {
    // Disable dates that are after today
    return current && current < moment().startOf("day");
  };

  const customHeaderRender = ({ value, onChange }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "500" }}>
          {value.format("MMMM YYYY")}
        </span>
      </div>
    );
  };

  const handleEmployeeCount = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setEmployeeCount(value);
    if (validationTrigger) {
      setEmployeeCountError(selectValidator(value));
    }
  };

  const handleSchedule = (event) => {
    event.preventDefault();
    setValidationTrigger(true);

    const nameValidate = nameValidator(name);
    const emailValidate = emailValidator(companyEmail);
    const phoneValidate = mobileValidator(companyPhone);
    const companyNameValidate = descriptionValidator(companyName);
    const employeeCountValidate = selectValidator(employeeCount);

    setNameError(nameValidate);
    setCompanyEmailError(emailValidate);
    setCompanyPhoneError(phoneValidate);
    setCompanyNameError(companyNameValidate);
    setEmployeeCountError(employeeCountValidate);

    if (
      nameValidate ||
      emailValidate ||
      phoneValidate ||
      companyNameValidate ||
      employeeCountValidate
    )
      return;

    const payload = {
      name: name,
      email: companyEmail,
      phone: companyPhone,
      employeeCount: employeeCount,
      companyName: companyName,
      scheduleDate: date + time,
      description: description,
    };
    console.log("productdemo payload", payload);
    formReset();
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setCompanyEmail("");
    setCompanyEmailError("");
    setCompanyPhone("");
    setCompanyPhoneError("");
    setCompanyName("");
    setCompanyNameError("");
    setDescription("");
    setEmployeeCount("");
    setValidationTrigger(false);
    setDate(new Date());
    setFormOpen(false);
  };

  return (
    <div className="productdemo_maincontainer">
      <div className="productdemo_card">
        <Row>
          <Col span={8} className="productdemo_cardleftContainer">
            <div className="productdemo_hubloglogoContainer">
              <img src={hublogLogo} className="productdemo_hubloglogo" />
              {formOpen === true ? (
                <div
                  className="productdemo_backbuttonContainer"
                  onClick={() => {
                    setFormOpen(false);
                  }}
                >
                  <IoArrowBackOutline size={24} />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="productdemo_cardleftContentContainer">
              <p className="productdemo_hublogtext">Hublog</p>
              <p
                className="productdemo_headingtext"
                onClick={() => console.log(date)}
              >
                Product Demo
              </p>

              <div className="productdemo_minutediv">
                <FaRegClock size={18} style={{ marginRight: "10px" }} />
                <p style={{ marginTop: "2px" }}>45 min</p>
              </div>

              <div className="productdemo_minutediv">
                <MdOutlineGroups2 size={30} style={{ marginRight: "6px" }} />
                <p style={{ marginTop: "2px" }}>
                  Web conferencing details provided upon confirmation.
                </p>
              </div>

              <p className="productdemo_exploretext">
                Explore Workstatus' capabilities with a live walkthrough of key
                features and benefits. Ideal for those new to our software or
                considering a purchase.
              </p>
            </div>
          </Col>
          <Col span={16}>
            <div className="productdemo_rightcontainer">
              {formOpen ? (
                <div className="productdemo_formdiv">
                  <p className="productdemo_enterdetailstext">Enter Details</p>

                  <div className="productdemo_formfieldsdiv">
                    <CommonInputField
                      label="Name"
                      className="productdemo_formfields"
                      mandatory={true}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (validationTrigger) {
                          setNameError(nameValidator(e.target.value));
                        }
                      }}
                      value={name}
                      error={nameError}
                    />
                  </div>
                  <div className="productdemo_formfieldsdiv">
                    <CommonInputField
                      label="Email"
                      className="productdemo_formfields"
                      mandatory={true}
                      onChange={(e) => {
                        setCompanyEmail(e.target.value);
                        if (validationTrigger) {
                          setCompanyEmailError(emailValidator(e.target.value));
                        }
                      }}
                      value={companyEmail}
                      error={companyEmailError}
                    />
                  </div>

                  <div className="productdemo_formfieldsdiv">
                    <CommonInputField
                      label="Phone"
                      className="productdemo_formfields"
                      mandatory={true}
                      onChange={(e) => {
                        setCompanyPhone(e.target.value);
                        if (validationTrigger) {
                          setCompanyPhoneError(mobileValidator(e.target.value));
                        }
                      }}
                      value={companyPhone}
                      error={companyPhoneError}
                      maxLength={10}
                    />
                  </div>

                  <div className="productdemo_formfieldsdiv">
                    <CommonInputField
                      label="Company name"
                      className="productdemo_formfields"
                      mandatory={true}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        if (validationTrigger) {
                          setCompanyNameError(
                            descriptionValidator(e.target.value)
                          );
                        }
                      }}
                      value={companyName}
                      error={companyNameError}
                    />
                  </div>

                  <div className="productdemo_formfieldsdiv">
                    <CommonInputField
                      label="Schedule date"
                      className="productdemo_formfields"
                      value={moment(date.$d).format("DD-MM-YYYY") + ` ${time}`}
                      disabled={true}
                    />
                  </div>

                  <p className="productdemo_companyheadcountlabel">
                    Company headcount{" "}
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </p>
                  <Radio.Group
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      width: "max-content",
                    }}
                    options={CompanyHeadcountOptions}
                    onChange={handleEmployeeCount}
                    value={employeeCount}
                    className="productdemo_radiobutton"
                  ></Radio.Group>

                  {employeeCountError && (
                    <p className="productdemo_employeecounterror">
                      {"Company headcount" + " " + employeeCountError}
                    </p>
                  )}
                  <div style={{ width: "60%", marginTop: "16px" }}>
                    <CommonTextArea
                      label="Please share your requirements / expectations for us to customise your demo experience."
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                    />
                  </div>

                  <button
                    className="productdemo_schedulebutton"
                    onClick={handleSchedule}
                  >
                    Schedule event
                  </button>
                </div>
              ) : (
                <>
                  <p className="productdemo_slectdatetext">
                    Select a Date & Time
                  </p>

                  <Row gutter={16} style={{ width: "100%" }}>
                    <Col span={24}>
                      <div className="productdemo_calendarmainContainer">
                        <div
                          className={`productdemo_calendarContainer ${
                            isTimeOpen === true ? "expanded" : ""
                          }`}
                        >
                          <Calendar
                            fullscreen={false}
                            showWeek
                            mode="month"
                            disabledDate={disabledDate}
                            onChange={(value) => {
                              console.log("daeee", value.$d);
                              setIsTimeOpen(true);
                              setDate(value);
                            }}
                            onSelect={() => {
                              if (isTimeOpen === false) {
                                setIsTimeOpen(true);
                              }
                            }}
                            className="productdemo_calendar"
                            headerRender={customHeaderRender}
                            value={dayJs(date)}
                          />
                        </div>

                        <div
                          className={`productdemo_timinigcolcontainer ${
                            isTimeOpen === true ? "show" : ""
                          }`}
                        >
                          {timingOptions.map((item, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Row
                                  gutter={12}
                                  style={{ marginBottom: "20px" }}
                                >
                                  <Col
                                    span={24}
                                    className="productdemo_buttoncontainer"
                                  >
                                    <button
                                      className={`productdemo_timingbutton ${
                                        item.id === selectedTimeId
                                          ? "expanded"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedTimeId(item.id);
                                      }}
                                    >
                                      <p>{item.name}</p>
                                    </button>
                                    <button
                                      className={`productdemo_nextbutton ${
                                        item.id === selectedTimeId ? "show" : ""
                                      }`}
                                      onClick={() => {
                                        setFormOpen(true);
                                        setTime(item.name);
                                      }}
                                    >
                                      <p>Next</p>
                                    </button>
                                  </Col>
                                </Row>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
