import React, { useState } from "react";
import { Row, Col, Button, Modal, Drawer } from "antd";
import { VscOrganization } from "react-icons/vsc";
import "./styles.css";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";
import CommonSearchField from "../Common/CommonSearchbar";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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
      width: 240,
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
  ];

  const data = [
    {
      name: "Markerz Global Solution",
      key: "1",
      email: "markerz@gmail.com",
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
  const [employeeRange, setEmployeeRange] = useState();
  const [employeeRangeError, setEmployeeRangeError] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [linkdinError, setLinkdinError] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    console.log("rangeee", employeeRange, employeeRangeError);
    const nameValidate = nameValidator(name);
    const emailValidate = emailValidator(email);
    const mobileValidate = mobileValidator(mobile);
    const addressValidate = addressValidator(address);
    const employeerangeValidate = selectValidator(employeeRange);
    const domainValidate = addressValidator(domain);
    const websiteValidate = addressValidator(website);
    const linkdinValidate = addressValidator(linkdin);

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
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <VscOrganization size={20} />
        </div>
        <h2 className="allpage_mainheadings">Manage Organization</h2>
      </div>

      <div className="org_totalorgheading_container">
        <p className="org_totalheading">Total Organization - </p>
        <p className="org_totalcount">14</p>
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
          scroll={{ x: 2200 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
        />
      </div>

      {/* create organization drawer */}
      <Drawer
        title="Create organization"
        onClose={() => setIsDrawerOpen(false)}
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
                  setNameError(nameValidator(event.target.value));
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
                onChange={(value) => {
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
          <p className="billing_modalplan_values">40000</p>
        </div>
      </Modal>
    </div>
  );
}
