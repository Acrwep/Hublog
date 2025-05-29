import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowLeft } from "react-icons/fa6";
import { Row, Col, Button, Tooltip } from "antd";
import { DownloadOutlined, RedoOutlined } from "@ant-design/icons";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonSelectField from "../Common/CommonSelectField";
import { getProjects } from "../APIservice.js/action";
import moment from "moment";
import { CommonToaster } from "../Common/CommonToaster";
import CommonSearchField from "../Common/CommonSearchbar";
import DownloadTableAsCSV from "../Common/DownloadTableAsCSV";

const ProjectReport = () => {
  const navigation = useNavigate();
  const [organizationId, setOrganizationId] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [search, setSearch] = useState("");
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
    { id: 3, name: "Closed" },
  ];
  const [statusFilter, setStatusFilter] = useState();
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 240,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text, record) => {
        return <p>{moment(text).format("DD/MM/YYYY")} </p>;
      },
    },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  useEffect(() => {
    const getSubDomainfromLocal = localStorage.getItem("subDomain");
    setSubdomain(getSubDomainfromLocal);
    getProjectsData(null, null);
  }, []);

  const getProjectsData = async (sta, searchquery) => {
    setLoading(true);
    const container = document.getElementById("header_collapesbuttonContainer");
    container.scrollIntoView({ behavior: "smooth" });
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    setOrganizationId(orgId);
    const payload = {
      organizationId: orgId,
      searchQuery: searchquery,
      status:
        sta === 1
          ? "Active"
          : sta === 2
          ? "Inactive"
          : sta === 3
          ? "Closed"
          : "",
    };
    try {
      const response = await getProjects(payload);
      console.log("project response", response);
      const datas = response?.data;
      // const reverse = datas.reverse();
      setProjectData(datas);
    } catch (error) {
      setProjectData([]);
      const Error = error?.response?.data?.message;
      CommonToaster(Error, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    getProjectsData(value, search);
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    setLoading(true);
    const payload = {
      organizationId: organizationId,
      searchQuery: value,
      status:
        statusFilter === 1
          ? "Active"
          : statusFilter === 2
          ? "Inactive"
          : statusFilter === 3
          ? "Closed"
          : "",
    };
    try {
      const response = await getProjects(payload);
      setProjectData(response?.data);
    } catch (error) {
      setProjectData([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleRefresh = () => {
    if (!statusFilter && !search) {
      return;
    } else {
      setLoading(true);
      setSearch("");
      setStatusFilter();
      getProjectsData(null, null);
    }
  };

  return (
    <div className="settings_mainContainer">
      <div className="settings_headingContainer">
        <div className="settings_iconContainer">
          <TbReport size={20} />
        </div>
        <h2 className="allpage_mainheadings">Reports</h2>
      </div>

      <div
        className="reports_backContainer"
        onClick={() => navigation(`/${subdomain}/reports`)}
      >
        <FaArrowLeft size={16} />
        <p style={{ marginLeft: "12px" }}>Project Report</p>
      </div>
      <Row className="breakreports_calendarrowContainer">
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "12px" }}>
              <CommonSearchField
                placeholder="Search project..."
                onChange={handleSearch}
                value={search}
              />
            </div>
            <CommonSelectField
              options={statusList}
              placeholder="Select status"
              onChange={handleStatusFilter}
              value={statusFilter}
              style={{ width: "29%" }}
            />
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          className="breakreports_calendarContainer"
        >
          <Tooltip placement="top" title="Download">
            <Button
              className="dashboard_download_button"
              onClick={() => {
                DownloadTableAsCSV(projectData, columns, `Project Report.csv`);
              }}
              disabled={loading ? true : false}
            >
              <DownloadOutlined className="download_icon" />
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Refresh">
            <Button
              className="dashboard_refresh_button"
              onClick={handleRefresh}
            >
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <div className="breakreport_tableContainer">
        <CommonTable
          columns={columns}
          dataSource={projectData}
          scroll={{ x: 600 }}
          dataPerPage={10}
          checkBox="false"
          bordered="true"
          size="small"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProjectReport;
