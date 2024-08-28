import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Space, Dropdown, Button } from "antd";
import CommonSearchField from "../../Common/CommonSearchbar";
import "../styles.css";
import moment from "moment";
import CommonTable from "../../Common/CommonTable";
import CommonInputField from "../../Common/CommonInputField";
import { descriptionValidator } from "../../Common/Validation";
import CommonAddButton from "../../Common/CommonAddButton";
import {
  getDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "../../APIservice.js/action";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import CommonWarningModal from "../../Common/CommonWarningModal";
import { CommonToaster } from "../../Common/CommonToaster";
import Loader from "../../Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  storeActiveDesignation,
  storeDesignation,
  storeDesignationSearchValue,
} from "../../Redux/slice";
import CommonSelectField from "../../Common/CommonSelectField";

export default function Designation({ loading }) {
  const dispatch = useDispatch();
  const designationList = useSelector((state) => state.designation);
  const designationSearchValue = useSelector(
    (state) => state.designationsearchvalue
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());
  const statusOptions = [
    { id: 1, name: "Active" },
    { id: 0, name: "In Active" },
  ];
  const [status, setStatus] = useState(1);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: "200px" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 290,
    },
    {
      title: "Created At",
      dataIndex: "created_date",
      key: "created_date",
      width: 140,
      render: (text, record) => {
        return <p>{moment(record).format("DD/MM/YYYY")}</p>;
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
                        {" designation"}
                      </p>
                    ),
                    onDelete: () => handleDeleteDesignation(record.id),
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
    if (loading === false) {
      setSearch(designationSearchValue);
    }
  }, []);

  //get designation api function
  const getDesignationData = async () => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getDesignation(orgId);
      console.log("Designation response", response.data);
      const allDesignation = response.data;
      dispatch(storeDesignation(allDesignation));
      //filter active designation
      const filterActivedesignation = allDesignation.filter(
        (f) => f.active === true
      );
      dispatch(storeActiveDesignation(filterActivedesignation));
      //null the search value
      const searchValue = "";
      dispatch(storeDesignationSearchValue(searchValue));
      setSearch(searchValue);
    } catch (error) {
      CommonToaster(error, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 1000);
    }
  };

  const formReset = () => {
    setName("");
    setNameError("");
    setDescription("");
    setDescriptionError("");
    setStatus(1);
    setIsModalOpen(false);
    setEdit(false);
  };

  const handleCancel = () => {
    formReset();
  };

  const handleOk = async () => {
    const nameValidate = descriptionValidator(name);
    const descriptionValidate = descriptionValidator(description);

    setNameError(nameValidate);
    setDescriptionError(descriptionValidate);

    if (nameValidate || descriptionValidate) return;
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    const request = {
      name: name,
      description: description,
      active: status === 1 ? true : false,
      created_date: moment(createdDate).format("YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"),
      organizationId: parseInt(orgId),
      ...(edit && { id: id }),
    };
    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateDesignation(request);
        CommonToaster("Designation updated", "success");
        getDesignationData();
        formReset();
      } catch (error) {
        const Error = error?.response?.data?.message;
        if (
          Error ===
          "Designation is currently mapped to a user and cannot be deactivated."
        ) {
          CommonToaster("Unable to inactive. Mapped to user", "error", "error");
        } else {
          CommonToaster(Error, "error");
        }
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    } else {
      try {
        setTableLoading(true);
        const response = await createDesignation(request);
        CommonToaster("Designation created", "success");
        getDesignationData();
        formReset();
      } catch (error) {
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    }
  };

  const handleEdit = async (record) => {
    setEdit(true);
    setIsModalOpen(true);
    setId(record.id);
    setName(record.name);
    setStatus(record.active === true ? 1 : 0);
    setDescription(record.description);
  };

  const handleDeleteDesignation = async (id) => {
    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId"); //get orgId from localstorage
    try {
      const response = await deleteDesignation(orgId, id);
      getDesignationData();
      CommonToaster("Designation deleted", "success");
    } catch (error) {
      const deleteError = error?.response?.data;
      if (deleteError === "Error deleting designation") {
        CommonToaster("Unable to delete. Mapped to user", "error");
        return;
      }
      CommonToaster(error?.response?.data, "error");
    } finally {
      setTimeout(() => {
        setTableLoading(false);
      }, 350);
    }
  };

  //user search function
  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    dispatch(storeDesignationSearchValue(value));

    setTableLoading(true);
    const orgId = localStorage.getItem("organizationId");
    try {
      const response = await getDesignation(orgId, value);
      const allDesignation = response.data;
      dispatch(storeDesignation(allDesignation));
    } catch (error) {
      if (error) {
        const allDesignation = [];
        dispatch(storeDesignation(allDesignation));
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

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div>
          <Row style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <CommonSearchField
                placeholder="Search designation..."
                onChange={handleSearch}
                value={search}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className="designion_adduserbuttonContainer"
            >
              <CommonAddButton
                name="Add Designation"
                onClick={() => setIsModalOpen(true)}
              />
            </Col>
          </Row>
          <CommonTable
            columns={columns}
            dataSource={designationList}
            scroll={{ x: 900 }}
            dataPerPage={10}
            loading={tableLoading}
            checkBox="false"
          />
          {/* adddesignation modal */}
          <Modal
            title={edit ? "Update Designation" : "Add Designation"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button className="designation_submitbutton" onClick={handleOk}>
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
            <CommonInputField
              label="Description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(descriptionValidator(e.target.value));
              }}
              value={description}
              error={descriptionError}
              style={{ marginTop: "22px" }}
              mandatory
            />
            <CommonSelectField
              label="Status"
              options={statusOptions}
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
