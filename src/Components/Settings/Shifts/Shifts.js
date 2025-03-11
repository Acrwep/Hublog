import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Space, Dropdown } from "antd";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../Components/Common/CommonInputField";
import {
  breakTimeValidator,
  descriptionValidator,
  endTimeValidator,
  selectValidator,
} from "../../../Components/Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonAddButton from "../../Common/CommonAddButton";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "../../Common/Loader";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonTimePicker from "../../Common/CommonTimePicker";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { dayJs } from "../../Utils";
import { createShift, getShifts } from "../../APIservice.js/action";
import { storeSettingsShifts } from "../../Redux/slice";

export default function Shifts({ loading }) {
  const shiftsList = useSelector((state) => state.settingsshift);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shiftId, setShiftId] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const statusOptions = [
    { id: 1, name: "Active" },
    { id: 0, name: "In Active" },
  ];
  const [status, setStatus] = useState(1);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const columns = [
    { title: "Shift Name", dataIndex: "name", key: "name", width: 200 },
    {
      title: "Start time",
      dataIndex: "start_time",
      key: "start_time",
      width: 150,
      render: (text) => {
        return <p>{moment(text, "HH:mm:ss").format("hh:mm A")}</p>;
      },
    },
    {
      title: "End time",
      dataIndex: "end_time",
      key: "end_time",
      width: 150,
      render: (text) => {
        return <p>{moment(text, "HH:mm:ss").format("hh:mm A")}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text, record) => {
        if (text === true) {
          return (
            <div className="logsreport_mappingActivetextContainer">
              <p>Active</p>
            </div>
          );
        } else {
          return (
            <div className="logsreport_statusInActivetextContainer">
              <p>In Active</p>
            </div>
          );
        }
      },
    },
    {
      title: "Action",
      align: "center",
      width: 100,
      render: (text, record) => {
        return (
          <button onClick={() => handleEdit(record)}>
            <AiOutlineEdit size={20} className="alertrules_tableeditbutton" />
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    if (loading === false) {
      setSearch("");
    }
  }, []);

  const formReset = () => {
    setName("");
    setNameError("");
    setStartTime();
    setStartTimeError("");
    setEndTime();
    setEndTimeError("");
    setStatus(1);
    setIsModalOpen(false);
    setEdit(false);
  };

  const handleEdit = (record) => {
    console.log(record);
    setShiftId(record.id);
    setName(record.name);
    setStartTime(dayJs(record.start_time, "HH:mm:ss"));
    setEndTime(dayJs(record.end_time, "HH:mm:ss"));
    setStatus(record.status === true ? 1 : 0);
    setIsModalOpen(true);
    setEdit(true);
  };

  const handleCreateShift = async () => {
    console.log(startTime);
    console.log(moment(startTime.$d).format("HH:mm:ss"));
    const nameValidate = descriptionValidator(name);
    const starttimeValidate = selectValidator(startTime);
    const endtimeValidate = endTimeValidator(endTime, startTime);

    setNameError(nameValidate);
    setStartTimeError(starttimeValidate);
    setEndTimeError(endtimeValidate);

    if (nameValidate || starttimeValidate || endtimeValidate) return;

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage

    const payload = {
      OrganizationId: orgId,
      name: name,
      start_time: moment(startTime.$d).format("HH:mm:ss"),
      end_time: moment(endTime.$d).format("HH:mm:ss"),
      status: status === 1 ? true : false,
    };

    try {
      const response = await createShift(payload);
      console.log(response);
      setIsModalOpen(false);
      getShiftData();
    } catch (error) {
      console.log(error);
    }
  };

  const getShiftData = async () => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const payload = {
      organizationId: orgId,
    };
    try {
      const response = await getShifts(payload);
      const allShiftDetails = response.data;
      dispatch(storeSettingsShifts(allShiftDetails));
    } catch (error) {
      const allShiftDetails = [];
      dispatch(storeSettingsShifts(allShiftDetails));
      CommonToaster(error?.response?.data.message, "error");
    } finally {
      setTableLoading(false);
    }
  };

  const handleCancel = () => {
    formReset();
  };

  //break search
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleStartTime = (time, timeString) => {
    console.log(time);
    setStartTime(time);
    setStartTimeError(selectValidator(time));
  };

  const handleEndTime = (time, timeString) => {
    setEndTime(time);
    setEndTimeError(endTimeValidator(time, startTime));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <CommonSearchField
                placeholder="Search shift..."
                onChange={handleSearch}
                value={search}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              className="users_adduserbuttonContainer"
            >
              <CommonAddButton
                name="Add Shift"
                onClick={() => setIsModalOpen(true)}
              />
            </Col>
          </Row>

          <CommonTable
            columns={columns}
            dataSource={shiftsList}
            scroll={{ x: 600 }}
            dataPerPage={10}
            loading={tableLoading}
            bordered="false"
            checkBox="false"
            size="middle"
          />

          {/* addrole modal */}
          <Modal
            title={edit ? "Update Shift" : "Add Shift"}
            open={isModalOpen}
            onOk={handleCreateShift}
            onCancel={handleCancel}
            footer={[
              <button
                className="designation_submitbutton"
                onClick={handleCreateShift}
              >
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
              style={{ marginTop: "22px" }}
              mandatory
            />
            <CommonTimePicker
              label="Start Time"
              onChange={handleStartTime}
              value={startTime}
              error={startTimeError}
              mandatory
              style={{ marginTop: "22px" }}
            />
            <CommonTimePicker
              label="End Time"
              onChange={handleEndTime}
              value={endTime}
              error={endTimeError}
              mandatory
              style={{ marginTop: "22px" }}
            />
            <CommonSelectField
              label="Status"
              options={statusOptions}
              mandatory={true}
              onChange={(value) => setStatus(value)}
              value={status}
              style={{ marginTop: "22px" }}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
