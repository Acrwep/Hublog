import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Space, Dropdown } from "antd";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import CommonInputField from "../../../Components/Common/CommonInputField";
import {
  breakTimeValidator,
  descriptionValidator,
} from "../../../Components/Common/Validation";
import { CommonToaster } from "../../Common/CommonToaster";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonAddButton from "../../Common/CommonAddButton";
import { createBreak, getBreak, updateBreak } from "../../APIservice.js/action";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { storesettingsBreak } from "../../Redux/slice";
import Loader from "../../Common/Loader";
import CommonSelectField from "../../Common/CommonSelectField";

export default function Break({ loading }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breakId, setBreakId] = useState(null);
  const breakList = useSelector((state) => state.settingsBreak);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [breaktime, setBreakTime] = useState("");
  const [breaktimeError, setBreakTimeError] = useState("");
  const statusOptions = [
    { id: 1, name: "Active" },
    { id: 0, name: "In Active" },
  ];
  const [status, setStatus] = useState(1);
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const columns = [
    { title: "Break Name", dataIndex: "name", key: "name", width: 260 },
    {
      title: "Max Break Time",
      dataIndex: "max_Break_Time",
      key: "max_Break_Time",
      width: 260,
      render: (text) => {
        return <p>{text} mins</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      width: 110,
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
    setDummyData(breakList);
  }, []);

  const getBreakData = async () => {
    setTableLoading(true);
    try {
      const response = await getBreak();
      console.log("break response", response.data);
      const allbreakDetails = response.data;
      dispatch(storesettingsBreak(allbreakDetails));
    } catch (error) {
      CommonToaster(error?.response?.data?.message, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 1000);
    }
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setBreakTime("");
    setBreakTimeError("");
    setStatus(1);
    setIsModalOpen(false);
    setEdit(false);
  };

  const handleEdit = (record) => {
    setBreakId(record.id);
    setName(record.name);
    setBreakTime(record.max_Break_Time);
    setStatus(record.active === true ? 1 : 0);
    setIsModalOpen(true);
    setEdit(true);
  };
  const handleCreateBreak = async () => {
    const nameValidate = descriptionValidator(name);
    const breaktimeValidate = breakTimeValidator(breaktime);

    setNameError(nameValidate);
    setBreakTimeError(breaktimeValidate);

    if (nameValidate || breaktimeValidate) return;

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      Name: name,
      Max_Break_Time: parseInt(breaktime),
      Active: status,
      OrganizationId: orgId,
      ...(edit && { id: breakId }),
    };

    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateBreak(request);
        console.log("break update response", response);
        CommonToaster("Break updated successfully", "success");
        formReset();
        getBreakData();
      } catch (error) {
        console.log("update designation error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    } else {
      setTableLoading(true);
      try {
        const response = await createBreak(request);
        console.log("break response", response);
        CommonToaster("Break created successfully", "success");
        formReset();
        getBreakData();
      } catch (error) {
        console.log("create break error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    }
  };

  const handleCancel = () => {
    formReset();
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      dispatch(storesettingsBreak(dummyData));
      return;
    }
    const filterData = breakList.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    console.log("filter", filterData);
    dispatch(storesettingsBreak(filterData));
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
                placeholder="Search break..."
                onSearch={handleSearch}
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
                name="Add Break"
                onClick={() => setIsModalOpen(true)}
              />
            </Col>
          </Row>

          <CommonTable
            columns={columns}
            dataSource={breakList}
            scroll={{ x: 600 }}
            dataPerPage={10}
            loading={tableLoading}
            bordered="false"
            checkBox="false"
          />

          {/* addrole modal */}
          <Modal
            title="Add Break"
            open={isModalOpen}
            onOk={handleCreateBreak}
            onCancel={handleCancel}
            footer={[
              <button
                className="designation_submitbutton"
                onClick={handleCreateBreak}
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
              style={{ marginTop: "16px" }}
              mandatory
            />
            <CommonInputField
              label="Max Break Time"
              onChange={(e) => {
                setBreakTime(e.target.value);
                setBreakTimeError(breakTimeValidator(e.target.value));
              }}
              value={breaktime}
              error={breaktimeError}
              suffix="min"
              type="number"
              style={{ marginTop: "16px" }}
              mandatory
            />
            <CommonSelectField
              label="Status"
              options={statusOptions}
              onChange={(value) => setStatus(value)}
              value={status}
              style={{ marginTop: "16px" }}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
