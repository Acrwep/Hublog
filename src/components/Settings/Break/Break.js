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
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { storesettingsBreak } from "../../Redux/slice";

export default function Break() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breakId, setBreakId] = useState(null);
  const breakList = useSelector((state) => state.settingsBreak);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [breaktime, setBreakTime] = useState("");
  const [breaktimeError, setBreakTimeError] = useState("");
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
      width: 120,
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
              <p>Inactive</p>
            </div>
          );
        }
      },
    },
    {
      title: "Action",
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
                <button onClick={() => console.log(record)}>Edit</button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div style={{ display: "flex" }}>
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
      CommonToaster(error.response.data.message, "error");
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
    setIsModalOpen(false);
    setEdit(false);
  };

  const handleEdit = (record) => {
    setBreakId(record.id);
    setName(record.name);
    setBreakTime(record.max_Break_Time);
    setIsModalOpen(true);
    setEdit(true);
  };
  const handleCreateBreak = async () => {
    const nameValidate = descriptionValidator(name);
    const breaktimeValidate = breakTimeValidator(breaktime);

    setNameError(nameValidate);
    setBreakTime(breaktimeValidate);

    if (nameValidate || breaktimeValidate) return;

    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      Name: name,
      Max_Break_Time: parseInt(breaktime),
      Active: true,
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
    setIsModalOpen(false);
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
          style={{ marginTop: "20px", marginBottom: "20px" }}
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
          style={{ marginTop: "20px", marginBottom: "20px" }}
          mandatory
        />
      </Modal>
    </div>
  );
}
