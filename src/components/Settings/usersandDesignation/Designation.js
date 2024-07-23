import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "antd";
import CommonSearchField from "../../../Components/Common/CommonSearchbar";
import "../styles.css";
import moment from "moment";
import CommonTable from "../../../Components/Common/CommonTable";
import CommonInputField from "../../../Components/Common/CommonInputField";
import { descriptionValidator } from "../../../Components/Common/Validation";
import CommonAddButton from "../../Common/CommonAddButton";
import {
  getDesignation,
  createDesignation,
  updateDesignation,
} from "../../APIservice.js/action";
import { AiOutlineEdit } from "react-icons/ai";
import { CommonToaster } from "../../Common/CommonToaster";
import Loader from "../../Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { storeDesignation } from "../../Redux/slice";

export default function Designation({ loading }) {
  const dispatch = useDispatch();
  const designationList = useSelector((state) => state.designation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date());
  const [edit, setEdit] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: "200px" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "310px",
    },
    {
      title: "Created At",
      dataIndex: "created_date",
      key: "created_date",
      render: (text, record) => {
        return <p>{moment(record).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (text, record) => {
        return (
          <button onClick={() => handleEdit(record)}>
            <AiOutlineEdit size={20} className="alertrules_tableeditbutton" />
          </button>
        );
      },
    },
  ];
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    setDummyData(designationList);
  }, []);

  const getDesignationData = async () => {
    setTableLoading(true);
    try {
      const response = await getDesignation();
      console.log("Designation response", response.data);
      const allDesignation = response.data;
      dispatch(storeDesignation(allDesignation));
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
    setDescription("");
    setDescriptionError("");
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

    const request = {
      Name: name,
      Description: description,
      Active: true,
      Created_date: moment(createdDate).format("YYYY-MM-DDTHH:mm:ss.SSSSSSSZ"),
      OrganizationId: 1,
      ...(edit && { id: id }),
    };
    if (edit) {
      setTableLoading(true);
      try {
        const response = await updateDesignation(request);
        console.log("designation update response", response);
        CommonToaster("Designation updated successfully", "success");
        getDesignationData();
        formReset();
      } catch (error) {
        console.log("update designation error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    } else {
      try {
        setTableLoading(true);
        const response = await createDesignation(request);
        console.log("Designation create response", response);
        CommonToaster("Designation created successfully", "success");
        getDesignationData();
        formReset();
      } catch (error) {
        console.log("designation error", error);
        CommonToaster(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setTableLoading(false);
        }, 1000);
      }
    }
  };

  const handleEdit = async (record) => {
    console.log("Clicked Item", record);
    setEdit(true);
    setIsModalOpen(true);
    setId(record.id);
    setName(record.name);
    setDescription(record.description);
  };

  const handleSearch = (value) => {
    console.log("Search value:", value);
    if (value === "") {
      dispatch(storeDesignation(dummyData));
      return;
    }
    const filterData = designationList.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    console.log("filter", filterData);
    dispatch(storeDesignation(filterData));
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
                onSearch={handleSearch}
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
            scroll={{ x: 760 }}
            dataPerPage={10}
            loading={tableLoading}
            checkBox="false"
          />
          {/* adddesignation modal */}
          <Modal
            title="Add Designation"
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
              style={{ marginTop: "20px", marginBottom: "20px" }}
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
            />
          </Modal>
        </div>
      )}
    </>
  );
}
