import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Tooltip, Button, Space, Dropdown } from "antd";
import { TbReport } from "react-icons/tb";
import { RedoOutlined } from "@ant-design/icons";
import CommonDatePicker from "../Common/CommonDatePicker";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import CommonWarningModal from "../Common/CommonWarningModal";
import "./styles.css";
import CommonInputField from "../Common/CommonInputField";
import CommonSelectField from "../Common/CommonSelectField";
import CommonTable from "../Common/CommonTable";
import { descriptionValidator, selectValidator } from "../Common/Validation";
import CommonAddButton from "../Common/CommonAddButton";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../APIservice.js/action";
import { CommonToaster } from "../Common/CommonToaster";
import moment from "moment";
import CommonSearchField from "../Common/CommonSearchbar";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDate, setStartDate] = useState();
  const [startDateError, setStartDateError] = useState("");
  const [endDate, setEndDate] = useState();
  const [endDateError, setEndDateError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const statusList = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
    { id: 3, name: "Closed" },
  ];
  const [organizationId, setOrganizationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
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
              <div
                style={{ display: "flex" }}
                onClick={() => handleEdit(record)}
              >
                <AiOutlineEdit size={19} className="users_tableeditbutton" />
                <button>Edit</button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  CommonWarningModal({
                    title: (
                      <p style={{ fontWeight: "500", fontSize: "14px" }}>
                        {"Do you want to delete "}
                        <span style={{ fontWeight: "700", fontSize: "16px" }}>
                          {record.name}
                        </span>
                        {" project"}
                      </p>
                    ),
                    onDelete: () => handleDeleteProject(record.id),
                  });
                }}
              >
                <RiDeleteBin7Line
                  size={19}
                  className="users_tabledeletebutton"
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

  useEffect(() => {
    getProjectsData(null, null);
  }, []);

  const getProjectsData = async (sta, searchquery) => {
    setLoading(true);
    const orgId = localStorage.getItem("organizationId");
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

  //onchange functions
  const handleStartDate = (date, dateString) => {
    console.log(date, dateString);
    setStartDate(date); // Update the state when the date changes
    setStartDateError(selectValidator(date));
  };

  const handleEndDate = (date, dateString) => {
    console.log(date, dateString);
    setEndDate(date); // Update the state when the date changes
    setEndDateError(selectValidator(date));
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

  //handle reset form
  const formRestart = () => {
    setIsModalOpen(false);
    setEdit(false);
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setStartDate();
    setStartDateError("");
    setEndDate();
    setEndDateError("");
    setStatus();
    setStatusError("");
  };

  //onclick function
  const handleSubmit = async () => {
    const nameValidate = descriptionValidator(name);
    const descriptionValidate = descriptionValidator(description);
    const startDateValidate = selectValidator(startDate);
    const endDateValidate = selectValidator(endDate);
    const statusValidate = selectValidator(status);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);
    setStartDateError(startDateValidate);
    setEndDateError(endDateValidate);
    setStatusError(statusValidate);

    if (
      nameValidate ||
      descriptionValidate ||
      startDateValidate ||
      endDateValidate ||
      statusValidate
    )
      return;

    if (edit === true) {
      const updatepayload = {
        id: id,
        organizationId: organizationId,
        name: name,
        description: description,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        status:
          status === 1
            ? "Active"
            : status === 2
            ? "Inactive"
            : status === 3
            ? "Closed"
            : "",
      };

      try {
        const response = await updateProject(updatepayload);
        console.log(response);
        CommonToaster("Project updated", "success");
        formRestart();
      } catch (error) {
        CommonToaster(error?.response?.data?.message, "error");
      } finally {
        getProjectsData(statusFilter, search);
      }
    } else {
      const payload = {
        organizationId: organizationId,
        name: name,
        description: description,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        status:
          status === 1
            ? "Active"
            : status === 2
            ? "Inactive"
            : status === 3
            ? "Closed"
            : "",
      };

      try {
        const response = await createProject(payload);
        console.log(response);
        CommonToaster("Project created", "success");
        formRestart();
      } catch (error) {
        CommonToaster(error?.response?.data?.message, "error");
      } finally {
        getProjectsData(statusFilter, search);
      }
    }
  };

  const handleEdit = async (record) => {
    setEdit(true);
    setIsModalOpen(true);
    setId(record.id);
    setName(record.name);
    setDescription(record.description);
    setStartDate(record.start_date);
    setEndDate(record.end_date);
    setStatus(
      record.status === "Active" ? 1 : record.status === "Inactive" ? 2 : 3
    );
  };

  const handleDeleteProject = async (deleteId) => {
    const payload = {
      organizationId: organizationId,
      projectId: deleteId,
    };

    try {
      const response = await deleteProject(payload);
      CommonToaster("Deleted", "success");
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        getProjectsData(statusFilter, search);
      }, 500);
    }
  };

  const handleRefresh = () => {
    if (!statusFilter && !search) {
      return;
    } else {
      setLoading(true);
      formRestart();
      setSearch("");
      setStatusFilter();
      getProjectsData(null, null);
    }
  };

  return (
    <div className="settings_mainContainer">
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="settings_headingContainer">
            <div className="settings_iconContainer">
              <TbReport size={20} />
            </div>
            <h2 className="allpage_mainheadings">Projects</h2>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
          md={24}
          lg={12}
          xl={12}
          className="project_adduserbuttonContainer"
        >
          <CommonAddButton
            name="Add Project"
            onClick={() => setIsModalOpen(true)}
          />
          <Tooltip placement="top" title="Refresh">
            <Button
              className="dashboard_refresh_button"
              onClick={handleRefresh}
              style={{ marginLeft: "12px" }}
            >
              <RedoOutlined className="refresh_icon" />
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <div className="projecttable_Container">
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

      {/* addproject modal */}
      <Modal
        title={edit === true ? "Update Project" : "Add Project"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={formRestart}
        footer={[
          <button className="designation_submitbutton" onClick={handleSubmit}>
            Submit
          </button>,
        ]}
      >
        <CommonInputField
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
            setNameError(descriptionValidator(e.target.value));
          }}
          value={name}
          error={nameError}
          style={{ marginTop: "20px" }}
          mandatory
        />
        <CommonInputField
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
            setDescriptionError(descriptionValidator(e.target.value));
          }}
          value={description}
          error={descriptionError}
          mandatory
          style={{ marginTop: "20px" }}
        />
        <CommonDatePicker
          label="Start Date"
          placeholder="Start Date"
          onChange={handleStartDate}
          value={startDate}
          error={startDateError}
          mandatory
          style={{ marginTop: "20px" }}
        />
        <CommonDatePicker
          label="End Date"
          placeholder="End Date"
          onChange={handleEndDate}
          value={endDate}
          error={endDateError}
          mandatory
          style={{ marginTop: "20px" }}
        />
        <CommonSelectField
          label="Status"
          options={statusList}
          value={status}
          onChange={(value) => {
            setStatus(value);
            setStatusError(selectValidator(value));
          }}
          error={statusError}
          mandatory
          style={{ marginTop: "20px" }}
        />
      </Modal>
    </div>
  );
};

export default Projects;
