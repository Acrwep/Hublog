import React, { useState } from "react";
import { Row, Col, Button, Modal, Drawer, Space, Dropdown } from "antd";
import { VscOrganization } from "react-icons/vsc";
import "./styles.css";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";
import CommonSearchField from "../Common/CommonSearchbar";
import CommonCalendar from "../Common/CommonCalendar";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  addressValidator,
  emailValidator,
  mobileValidator,
  nameValidator,
  selectValidator,
} from "../Common/Validation";

export default function Organization() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 290,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 320,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 320,
    },
    {
      title: "Employees Range",
      dataIndex: "range",
      key: "range",
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: 320,
      render: (text) => {
        return (
          <div className="orgtable_urlsContainer">
            <a className="orgtable_urls" href={text} target="_blank">
              {text}
            </a>
          </div>
        );
      },
    },
    {
      title: "Linkdin ",
      dataIndex: "linkdin",
      key: "linkdin",
      width: 320,
      render: (text) => {
        return (
          <div className="orgtable_urlsContainer">
            <a className="orgtable_urls" href={text} target="_blank">
              {text}
            </a>
          </div>
        );
      },
    },
    {
      title: "Plan details ",
      dataIndex: "plan",
      key: "plan",
      width: 120,
      render: (text) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => setIsModalOpen(true)}
          >
            <HiOutlineExclamationCircle
              size={24}
              className="plandetails_icon"
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "active",
      key: "active",
      align: "center",
      width: 100,
      fixed: "right",
      render: (text, record) => {
        const items = [
          {
            key: "1",
            label: (
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => handleEdit(record)}
                  style={{ display: "flex" }}
                >
                  <AiOutlineEdit size={19} className="users_tableeditbutton" />{" "}
                  Edit
                </button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div style={{ display: "flex" }}>
                <RiDeleteBin7Line
                  size={19}
                  className="users_tableinactivebutton"
                />
                <button onClick={() => console.log(record)}>Delete</button>
              </div>
            ),
          },
        ];
        return (
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                arrow
              >
                <button className="usertable_actionbutton">
                  <BsThreeDotsVertical />
                </button>
              </Dropdown>
            </Space>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      name: "Markerz Global Solution",
      key: "1",
      email: "markerz@actetechnologies.com",
      mobile: "9787878772",
      address: "11/12 velachery chennai 600014",
      range: "50-100",
      domain: "acte",
      website: "https://www.markerzglobal.com/",
      linkdin: "https://www.markerzglobal.com/",
    },
  ];

  //usestates
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const employeeRangeOptions = [
    { id: 1, name: "0-10" },
    { id: 2, name: "10-50" },
    { id: 3, name: "50-100" },
    { id: 4, name: "100-500" },
    { id: 5, name: "500-1000" },
    { id: 6, name: "1000-10000" },
  ];
  const [employeeRange, setEmployeeRange] = useState(null);
  const [employeeRangeError, setEmployeeRangeError] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [linkdinError, setLinkdinError] = useState("");
  const [license, setLicense] = useState(null);
  const [licenseError, setLicenseError] = useState("");
  const [planId, setPlanId] = useState(null);
  const [planError, setPlanError] = useState("");
  const [planStartDate, setPlanStartDate] = useState(null);
  const [planStartDateError, setPlanStartDateError] = useState("");
  const [planExpireDate, setPlanExpireDate] = useState(null);
  const [planExpireDateError, setPlanExpireDateError] = useState("");
  const planOptions = [
    { id: 1, name: "Free" },
    { id: 2, name: "Starter" },
    { id: 3, name: "Elite" },
  ];
  const [validationTrigger, setValidationTrigger] = useState(false);

  const handlePlanStartDate = (date) => {
    if (date) {
      setPlanStartDate(date.toDate());
      if (validationTrigger) {
        setPlanExpireDateError(selectValidator(date.toDate()));
      }
    } else {
      setPlanStartDate(null);
    }
  };

  const handlePlanExpireDate = (date) => {
    if (date) {
      setPlanExpireDate(date.toDate());
      if (validationTrigger) {
        setPlanStartDateError(selectValidator(date.toDate()));
      }
    } else {
      setPlanExpireDate(null);
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    setValidationTrigger(true);
    const nameValidate = nameValidator(name);
    const emailValidate = emailValidator(email);
    const mobileValidate = mobileValidator(mobile);
    const addressValidate = addressValidator(address);
    const employeerangeValidate = selectValidator(employeeRange);
    const domainValidate = addressValidator(domain);
    const websiteValidate = addressValidator(website);
    const linkdinValidate = addressValidator(linkdin);
    const licenseValidate = selectValidator(license);
    const planValidate = selectValidator(planId);
    const planStartdateValidate = selectValidator(planStartDate);
    const planExpiredateValidate = selectValidator(planExpireDate);

    setNameError(nameValidate);
    setEmailError(emailValidate);
    setMobileError(mobileValidate);
    setAddressError(addressValidate);
    setEmployeeRangeError(employeerangeValidate);
    setDomainError(domainValidate);
    setWebsiteError(websiteValidate);
    setLinkdinError(linkdinValidate);
    setLicenseError(licenseValidate);
    setPlanError(planValidate);
    setPlanStartDateError(planStartdateValidate);
    setPlanExpireDateError(planExpiredateValidate);

    if (
      nameValidate ||
      emailValidate ||
      mobileValidate ||
      addressValidate ||
      employeerangeValidate ||
      domainValidate ||
      websiteValidate ||
      linkdinValidate ||
      licenseValidate ||
      planValidate ||
      planStartdateValidate ||
      planExpiredateValidate
    )
      return;
  };

  const handleEdit = (record) => {
    setIsDrawerOpen(true);
    setName(record.name);
    setEmail(record.email);
    setMobile(record.mobile);
    setAddress(record.address);
    setEmployeeRange(2);
    setDomain(record.domain);
    setWebsite(record.website);
    setLinkdin(record.linkdin);
    setLicense(20);
    setPlanId(2);
  };

  const handleReset = () => {
    setIsDrawerOpen(false);
    setValidationTrigger(false);
    setName("");
    setNameError("");
    setEmail("");
    setEmailError("");
    setMobile("");
    setMobileError("");
    setAddress("");
    setAddressError("");
    setEmployeeRange(null);
    setEmployeeRangeError("");
    setDomain("");
    setDomainError("");
    setWebsite("");
    setWebsiteError("");
    setLinkdin("");
    setLinkdinError("");
    setLicense(null);
    setLicenseError("");
    setPlanId(null);
    setPlanError("");
    setPlanStartDate(null);
    setPlanStartDateError("");
    setPlanExpireDate(null);
    setPlanExpireDateError("");
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <VscOrganization size={20} />
        </div>
        <h2 className="allpage_mainheadings">Manage Organization</h2>
      </div>

      <div className="org_totalorgheading_container">
        <p className="org_totalheading">Total Organization (14)</p>
      </div>

      <Row style={{ marginTop: "12px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <CommonSearchField placeholder="Search organization" />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="org_createorgbutton_container">
            <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
              Create Organization
            </Button>
          </div>
        </Col>
      </Row>

      <div>
        <p className="org_tableheading">Organization Details</p>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 2400 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
        />
      </div>

      {/* create organization drawer */}
      <Drawer
        title="Create organization"
        onClose={handleReset}
        open={isDrawerOpen}
        width="42%"
        styles={{ body: { padding: "0px 12px" } }}
      >
        <div>
          <Row gutter={16} style={{ marginTop: "22px" }}>
            <Col span={12}>
              <CommonInputField
                label="Name"
                onChange={(event) => {
                  setName(event.target.value);
                  if (validationTrigger) {
                    setNameError(nameValidator(event.target.value));
                  }
                }}
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
                  if (validationTrigger) {
                    setEmailError(emailValidator(event.target.value));
                  }
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
                  if (validationTrigger) {
                    setMobileError(mobileValidator(event.target.value));
                  }
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
                  if (validationTrigger) {
                    setAddressError(addressValidator(event.target.value));
                  }
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
                onChange={(value) => {
                  setEmployeeRange(value);
                  if (validationTrigger) {
                    setEmployeeRangeError(selectValidator(value));
                  }
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
                  if (validationTrigger) {
                    setDomainError(addressValidator(event.target.value));
                  }
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
                  if (validationTrigger) {
                    setWebsiteError(addressValidator(event.target.value));
                  }
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
                  if (validationTrigger) {
                    setLinkdinError(addressValidator(event.target.value));
                  }
                }}
                value={linkdin}
                error={linkdinError}
                mandatory={true}
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: "22px" }}>
            <Col span={12}>
              <CommonInputField
                label="License"
                onChange={(event) => {
                  if (event.target.value < 0) {
                    setLicense(0);
                    return;
                  }
                  setLicense(event.target.value);
                  if (validationTrigger) {
                    setLicenseError(selectValidator(event.target.value));
                  }
                }}
                type="number"
                value={license}
                error={licenseError}
                mandatory={true}
              />
            </Col>
            <Col span={12}>
              <CommonSelectField
                label="Plan"
                options={planOptions}
                onChange={(value) => {
                  setPlanId(value);
                  if (validationTrigger) {
                    setPlanError(selectValidator(value));
                  }
                }}
                value={planId}
                error={planError}
                mandatory={true}
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: "22px" }}>
            <Col span={12}>
              <CommonCalendar
                label="Plan Start Date"
                onChange={handlePlanStartDate}
                value={planStartDate}
                error={planStartDateError}
                mandatory
              />
            </Col>
            <Col span={12}>
              <CommonCalendar
                label="Plan Expire Date"
                onChange={handlePlanExpireDate}
                value={planExpireDate}
                error={planExpireDateError}
                mandatory
              />
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="org_createbutton"
              type="submit"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </Drawer>
      {/* plan details modal */}
      <Modal
        title="Plan Details"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        centered
      >
        <div>
          <p className="billing_modalplan_heading">Plan</p>
          <p className="billing_modalplan_values">Stater Monthly</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p className="billing_modalplan_heading">Current License usage</p>
          <p className="billing_modalplan_values">45/50</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p className="billing_modalplan_heading">Paid amount</p>
          <p className="billing_modalplan_values">₹40000</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p className="billing_modalplan_heading">Paid Start Date</p>
          <p className="billing_modalplan_values">12/10/2024</p>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p className="billing_modalplan_heading">Paid Expire Date</p>
          <p className="billing_modalplan_values">12/11/2024</p>
        </div>
      </Modal>
    </div>
  );
}
