import React, { useState } from "react";
import { Button, Col, Drawer, Modal, Row } from "antd";
import { TbTicket } from "react-icons/tb";
import "./styles.css";
import CommonTable from "../Common/CommonTable";
import { GiCheckMark } from "react-icons/gi";
import { MdCurrencyRupee, MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { BiSpreadsheet } from "react-icons/bi";

export default function Billing() {
  const columns = [
    {
      title: "Invoice Date",
      dataIndex: "invoicedate",
      key: "invoicedate",
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "totalamount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (text, record) => {
        if (text === true) {
          return (
            <div className="logsreport_mappingActivetextContainer">
              <p>Paid</p>
            </div>
          );
        } else {
          return (
            <div className="logsreport_statusInActivetextContainer">
              <p>Not Paid</p>
            </div>
          );
        }
      },
    },
    {
      title: "Invoice Email",
      dataIndex: "email",
      key: "email",
      width: 390,
    },
  ];

  const data = [
    {
      invoicedate: "17/07/2024",
      key: "1",
      duedate: "30/07/2024",
      totalamount: "40,000",
      status: true,
    },
  ];
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monthly, setMonthly] = useState(true);
  const [licenceCount, setLicenceCount] = useState(0);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <BiSpreadsheet size={20} />
        </div>
        <h2 className="allpage_mainheadings">Billing</h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="billing_card">
          <Row className="billing_card_rowdiv">
            <Col span={8}>
              <p className="billingcard_subheadings">Name:</p>
            </Col>
            <Col span={16}>
              <p className="billing_companyname">
                Markerz Global Solution private limited
              </p>
            </Col>
          </Row>
          <Row className="billing_card_rowdiv">
            <Col span={8}>
              <p className="billingcard_subheadings">Plan Name:</p>
            </Col>
            <Col span={16}>
              <p className="billing_companyname">Hublog Elite</p>
            </Col>
          </Row>
          <Row className="billing_card_rowdiv">
            <Col span={8}>
              <p className="billingcard_subheadings">Total Usage:</p>
            </Col>
            <Col span={16}>
              <p className="billing_companyname">46/50</p>
            </Col>
          </Row>
          <Row className="billing_card_rowdiv">
            <Col span={8}>
              <p className="billingcard_subheadings">Subscription Status:</p>
            </Col>
            <Col span={16}>
              <p className="billing_companyname">Active</p>
            </Col>
          </Row>
          <Row className="billing_card_rowdiv">
            <Col span={8}>
              <p className="billingcard_subheadings">Next Billing Date:</p>
            </Col>
            <Col span={16}>
              <p className="billing_companyname">9/19/2024</p>
            </Col>
          </Row>
          <div className="billing_upgradebuttonContainer">
            <Button type="primary" onClick={() => setOpen(true)}>
              <FaRegArrowAltCircleUp size={17} />
              Upgrade plan
            </Button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <p className="invoicetable_heading"> Invoice Detail</p>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 600 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          paginationStatus={false}
        />
      </div>

      {/* plan details drawer */}
      <Drawer
        title="Upgrade plan"
        onClose={onClose}
        open={open}
        styles={{ body: { padding: 0 } }}
        width="calc(-200px + 100vw)"
      >
        <div className="billing_planmainContainer">
          <div className="billing_planinnerContainer">
            <Row>
              <Col span={12}>
                <p className="chooseplan_heading">Choose your plan</p>
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <div className="billing_buttontabdiv">
                  <p
                    className={
                      monthly ? "monthlytab_text" : "monthlytab_inactivetext"
                    }
                    onClick={() => setMonthly(true)}
                  >
                    Monthly
                  </p>
                  <p
                    className={
                      monthly === false
                        ? "yearlytab_text"
                        : "monthlytab_inactivetext"
                    }
                    onClick={() => setMonthly(false)}
                  >
                    Yearly
                  </p>
                </div>
              </Col>
            </Row>

            <Row
              gutter={16}
              style={{ marginTop: "30px", marginBottom: "30px" }}
            >
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={8}
                className="billing_plandetailscolumndiv"
              >
                <div className="billing_plandetailscard">
                  <div className="billing_planamount_container">
                    <p className="billing_planname">Free</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <MdCurrencyRupee
                        size={22}
                        style={{ marginTop: "12px" }}
                      />
                      <p className="billing_planamount">0</p>
                    </div>
                    <p className="billing_permonthtext">/user/month</p>
                    <div className="billing_getstartbuttondiv">
                      <Button
                        className="billing_getstartbutton"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Get started
                      </Button>
                    </div>
                  </div>

                  <div style={{ padding: "29px" }}>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Upto 3 Users</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Attendance</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Capture Freq Live (30 Minutes){" "}
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Data Retention (3 Weeks){" "}
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Settings </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Screenshot </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={8}
                className="billing_plandetailscolumndiv"
              >
                <div className="billing_plandetailscard">
                  <div className="billing_planamount_container">
                    <p className="billing_planname">Starter</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <MdCurrencyRupee
                        size={22}
                        style={{ marginTop: "12px" }}
                      />
                      <p className="billing_planamount">
                        {monthly ? "399" : "299"}
                      </p>
                    </div>
                    <p className="billing_permonthtext">/user/month</p>
                    <div className="billing_getstartbuttondiv">
                      <Button
                        className="billing_getstartbutton"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Get started
                      </Button>
                    </div>
                  </div>

                  <div style={{ padding: "29px" }}>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Unlimited Users
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Attendance</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Capture Freq Live (10 Minutes){" "}
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Data Retention (6 Months){" "}
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Dashboard </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Settings</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Activity</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Admin Mobile App
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Screenshot</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Email/Download All Reports
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={8}
                className="billing_plandetailscolumndiv"
              >
                <div className="billing_plandetailscard">
                  <div className="billing_planamount_container">
                    <p className="billing_planname">Elite</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <MdCurrencyRupee
                        size={22}
                        style={{ marginTop: "12px" }}
                      />
                      <p className="billing_planamount">
                        {monthly ? "599" : "399"}
                      </p>
                    </div>
                    <p className="billing_permonthtext">/user/month</p>
                    <div className="billing_getstartbuttondiv">
                      <Button
                        className="billing_getstartbutton"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Get started
                      </Button>
                    </div>
                  </div>

                  <div style={{ padding: "29px" }}>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Unlimited Users
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Attendance</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Shift</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Capture Freq Live (5 Minutes)
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Wellness</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Application</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">SSO</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Field</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Data Retention (1 Year)
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Dashboard</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Settings</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Productivity</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Project Management
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Alerts</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Activity</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Admin Mobile App
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Screenshot</p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">
                        Email/Download All Reports
                      </p>
                    </div>
                    <div className="billing_modulesnameContainer">
                      <GiCheckMark size={17} />
                      <p className="billing_modulesname_text">Timeline</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Drawer>

      <Modal
        title="Plan Details"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <button
            className="designation_submitbutton"
            onClick={() => setIsModalOpen(false)}
          >
            Submit
          </button>,
        ]}
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
          <p className="billing_modalplan_heading">Licence count</p>
          <div style={{ display: "flex", marginTop: "3px" }}>
            <div
              className="billing_modalminusContainer"
              onClick={() => {
                if (licenceCount <= 0) {
                  return;
                } else {
                  setLicenceCount(licenceCount - 1);
                }
              }}
            >
              <FaMinus size={16} />
            </div>
            <p className="billing_licencecount">{licenceCount}</p>
            <div
              className="billing_modalminusContainer"
              onClick={() => setLicenceCount(licenceCount + 1)}
            >
              <MdOutlineAdd size={17} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <p className="billing_modalplan_heading">New Pricing</p>
          <p className="billing_modalplan_values">
            ₹299 <span className="billing_modal_permonthtext">/user/month</span>
          </p>
        </div>
      </Modal>
    </div>
  );
}
