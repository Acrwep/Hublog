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
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
import Loader from "../../Common/Loader";
import CommonSelectField from "../../Common/CommonSelectField";
import CommonTimePicker from "../../Common/CommonTimePicker";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { dayJs } from "../../Utils";
import {
  createShift,
  deleteShift,
  getShifts,
  updateShift,
} from "../../APIservice.js/action";
import { storeSettingsShifts, storeShiftSearchValue } from "../../Redux/slice";
import CommonWarningModal from "../../Common/CommonWarningModal";

export default function Shifts({ loading }) {
  const dispatch = useDispatch();
  const shiftsList = useSelector((state) => state.settingsshift);
  const shiftSearchValue = useSelector((state) => state.shiftsearchvalue);

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
    { id: 2, name: "In Active" },
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
    // {
    //   title: "Action",
    //   align: "center",
    //   width: 100,
    //   render: (text, record) => {
    //     return (
    //       <button onClick={() => handleEdit(record)}>
    //         <AiOutlineEdit size={20} className="alertrules_tableeditbutton" />
    //       </button>
    //     );
    //   },
    // },
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
                      </p>
                    ),
                    onDelete: () => handleDeleteShift(record.id),
                  });
                }}
              >
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

  useEffect(() => {
    if (loading === false) {
      setSearch(shiftSearchValue);
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
    setStatus(record.status === true ? 1 : 2);
    setIsModalOpen(true);
    setEdit(true);
  };

  const handleDeleteShift = async (id) => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await deleteShift(orgId, id);
      getShiftData();
      CommonToaster("Shift deleted", "success");
    } catch (error) {
      const deleteError = error?.response?.data;
      if (deleteError === "Error deleting Shift") {
        CommonToaster("Unable to delete. Mapped to team", "error");
        return;
      }
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
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
      ...(edit && { id: shiftId }),
      OrganizationId: orgId,
      name: name,
      start_time: moment(startTime.$d).format("HH:mm:ss"),
      end_time: moment(endTime.$d).format("HH:mm:ss"),
      status: status === 1 ? true : false,
    };

    if (edit) {
      try {
        const response = await updateShift(payload);
        console.log(response);
        setIsModalOpen(false);
        getShiftData();
        CommonToaster("Shift updated", "success");
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      }
    } else {
      try {
        const response = await createShift(payload);
        console.log(response);
        setIsModalOpen(false);
        getShiftData();
      } catch (error) {
        CommonToaster(error?.response?.data, "error");
      }
    }
  };

  const getShiftData = async () => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await getShifts(orgId, search);
      const allShiftDetails = response.data;
      dispatch(storeSettingsShifts(allShiftDetails));
    } catch (error) {
      const allShiftDetails = [];
      dispatch(storeSettingsShifts(allShiftDetails));
      CommonToaster(error?.response?.data.message, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
  };

  const handleCancel = () => {
    formReset();
  };

  //break search
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);

    dispatch(storeShiftSearchValue(value));

    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getShifts(orgId, value);
      const allShiftDetails = response.data;
      dispatch(storeSettingsShifts(allShiftDetails));
    } catch (error) {
      if (error) {
        const allShiftDetails = [];
        dispatch(storeSettingsShifts(allShiftDetails));
        setTimeout(() => {
          setTableLoading(false);
        }, 350);
      }
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
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
        loading={loading === true ? loading : tableLoading}
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
  );
}
