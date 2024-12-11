import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Button, Select, Modal } from "antd";
import CommonInputField from "../../Common/CommonInputField";
import CommonSearchField from "../../Common/CommonSearchbar";
import CommonSelectField from "../../Common/CommonSelectField";
import { RedoOutlined } from "@ant-design/icons";
import CommonTable from "../../Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { IoGlobeOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import "../styles.css";
import {
  createImbuildAppsandUrls,
  getImbuildAppsandUrls,
  updateImbuildAppsandUrls,
} from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import {
  storeImbuildAppsandUrls,
  storeImbuildappsandurlsCount,
  storeMappingSearchValue,
  storeMappingShowId,
  storeMappingStatusId,
} from "../../Redux/slice";
import { descriptionValidator, selectValidator } from "../../Common/Validation";
import CommonAddButton from "../../Common/CommonAddButton";

export default function Mapping() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);
  const ImbuildAppsandUrls = useSelector((state) => state.imbuildappsandurls);
  const ImbuildAppsandUrlsCount = useSelector(
    (state) => state.imbuildappsandurlscount
  );
  const searchValuefromRedux = useSelector((state) => state.mappingsearchvalue);
  const showIdfromRedux = useSelector((state) => state.mappingshowid);
  const statusIdfromRedux = useSelector((state) => state.mappingstatusid);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [showId, setShowId] = useState(1);
  const [mappedStatusId, setMappedStatusId] = useState(1);
  const typeList = [
    { id: 1, name: "App" },
    { id: 2, name: "Url" },
  ];
  const showAll = [
    { id: 1, name: "Show All" },
    { id: 2, name: "Apps" },
    { id: 3, name: "Urls" },
  ];
  const MappedStatus = [
    { id: 1, name: "All" },
    { id: 2, name: "Mapped" },
    { id: 3, name: "Unmapped" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationTrigger, setValidationTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (text) => {
        const Name = text.charAt(0).toUpperCase() + text.slice(1);
        if (text === "url") {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoGlobeOutline size={19} />
              <p style={{ fontWeight: "600", marginLeft: "12px" }}>{Name}</p>
            </div>
          );
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaDesktop size={19} />
              <p style={{ fontWeight: "600", marginLeft: "12px" }}>{Name}</p>
            </div>
          );
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "details",
      width: 220,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      render: (text, record) => {
        return (
          <Select
            className="maplisttable_selectfield"
            placeholder="Selecet category"
            options={categoriesList.map((item) => ({
              value: item.categoryId,
              label: item.categoryName,
            }))}
            value={record.categoryId}
            onChange={(value) => handleCategory(value, record.id)}
            style={{ width: "170px" }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    setSearch(searchValuefromRedux);
    setShowId(showIdfromRedux);
    setMappedStatusId(statusIdfromRedux);
  }, []);

  const handleCategory = async (value, id) => {
    console.log(value);
    setLoading(true);
    const payload = {
      categoryId: value,
    };
    console.log("payload", payload);
    try {
      const response = await updateImbuildAppsandUrls(id, payload);
      console.log("ressss", response);
      CommonToaster("Category assigned", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        getImbuildAppsandUrlsData();
      }, 350);
    }
  };

  const getImbuildAppsandUrlsData = async () => {
    const orgId = localStorage.getItem("organizationId");
    const payload = {
      organizationId: orgId,
    };
    try {
      const response = await getImbuildAppsandUrls(payload);
      console.log(response);
      const imbuildData = response?.data?.data;
      dispatch(storeImbuildAppsandUrls(imbuildData));
      dispatch(storeImbuildappsandurlsCount(imbuildData.length));
    } catch (error) {
      dispatch(storeImbuildAppsandUrls([]));
    } finally {
      setLoading(false);
    }
  };

  const formReset = () => {
    setIsModalOpen(false);
    setName("");
    setNameError("");
    setType(1);
    setTypeError("");
    setCategoryId(null);
    setValidationTrigger(false);
  };

  const handleCancel = () => {
    formReset();
  };

  const handleOk = async () => {
    setValidationTrigger(true);
    const orgId = localStorage.getItem("organizationId");
    const nameValidate = descriptionValidator(name);
    const typeValidate = selectValidator(type);

    setNameError(nameValidate);
    setTypeError(typeValidate);

    if (nameValidate || typeValidate) return;
    setLoading(true);

    const request = {
      organizationId: orgId,
      name: name,
      type: type === 1 ? "app" : "url",
      categoryId: categoryId,
    };
    try {
      const response = await createImbuildAppsandUrls(request);
      setIsModalOpen(false);
      CommonToaster("Created", "success");
      getImbuildAppsandUrlsData();
      formReset();
    } catch (error) {
      const Error = error?.response?.data?.message;
      CommonToaster(Error, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    dispatch(storeMappingSearchValue(value));
    setLoading(true);

    const orgId = localStorage.getItem("organizationId");
    const payload = {
      organizationId: orgId,
      ...(value && { userSearchQuery: value }),
      type: showId === 1 ? "" : showId === 2 ? "app" : "url",
      category:
        mappedStatusId === 1
          ? ""
          : mappedStatusId === 2
          ? "mapped"
          : "unmapped",
    };
    try {
      const response = await getImbuildAppsandUrls(payload);
      dispatch(storeImbuildAppsandUrls(response?.data?.data));
    } catch (error) {
      const allUsers = [];
      dispatch(storeImbuildAppsandUrls(allUsers));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleShow = async (value) => {
    setLoading(true);
    setShowId(value);
    dispatch(storeMappingShowId(value));
    const orgId = localStorage.getItem("organizationId");
    const payload = {
      organizationId: orgId,
      ...(search && { userSearchQuery: search }),
      type: value === 1 ? "" : value === 2 ? "app" : "url",
      category:
        mappedStatusId === 1
          ? ""
          : mappedStatusId === 2
          ? "mapped"
          : "unmapped",
    };
    try {
      const response = await getImbuildAppsandUrls(payload);
      dispatch(storeImbuildAppsandUrls(response?.data?.data));
    } catch (error) {
      const allUsers = [];
      dispatch(storeImbuildAppsandUrls(allUsers));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleMappedStatus = async (value) => {
    setLoading(true);
    setMappedStatusId(value);
    dispatch(storeMappingStatusId(value));
    const orgId = localStorage.getItem("organizationId");
    const payload = {
      organizationId: orgId,
      ...(search && { userSearchQuery: search }),
      type: showId === 1 ? "" : showId === 2 ? "app" : "url",
      category: value === 1 ? "" : value === 2 ? "mapped" : "unmapped",
    };
    try {
      const response = await getImbuildAppsandUrls(payload);
      dispatch(storeImbuildAppsandUrls(response?.data?.data));
    } catch (error) {
      const allUsers = [];
      dispatch(storeImbuildAppsandUrls(allUsers));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 350);
    }
  };

  const handleRefresh = () => {
    if (search === "" && showId === 1 && mappedStatusId === 1) {
      return;
    } else {
      setLoading(true);
      dispatch(storeMappingSearchValue(""));
      dispatch(storeMappingShowId(1));
      dispatch(storeMappingStatusId(1));
      setSearch("");
      setShowId(1);
      setMappedStatusId(1);
      getImbuildAppsandUrlsData();
    }
  };
  return (
    <div>
      <p className="users_totoalusersheading">
        Total apps & urls ({ImbuildAppsandUrlsCount})
      </p>
      <Row style={{ marginTop: "14px" }}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CommonSearchField
            placeholder="Search apps and urls..."
            onChange={handleSearch}
            value={search}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="mapping_headerselectfieldsColumnContainer"
        >
          <div
            className="mapping_headerselectfieldsContainer"
            style={{ display: "flex" }}
          >
            <CommonSelectField
              placeholder="Show All"
              options={showAll}
              value={showId}
              onChange={handleShow}
              style={{ marginRight: "12px", width: "102px" }}
            />
            <CommonSelectField
              placeholder="Show All"
              options={MappedStatus}
              value={mappedStatusId}
              onChange={handleMappedStatus}
              style={{ width: "124px" }}
            />
            <Button
              className="settings_mappingaddbutton"
              style={{ marginLeft: "12px" }}
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </Button>
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
                onClick={handleRefresh}
              >
                <RedoOutlined className="refresh_icon" />
              </Button>
            </Tooltip>
          </div>
        </Col>
      </Row>

      <p className="mapping_tableheading">Mapping list</p>
      <div className="productivityrules_inbuildtableContainer">
        <CommonTable
          columns={columns}
          dataSource={ImbuildAppsandUrls}
          scroll={{ x: 600 }}
          dataPerPage={50}
          checkBox="false"
          size="small"
          loading={loading}
        />
      </div>

      {/* add apps or url modal */}
      <Modal
        title="Add App or Url"
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
            if (validationTrigger) {
              setNameError(descriptionValidator(e.target.value));
            }
          }}
          value={name}
          error={nameError}
          mandatory
        />
        <CommonSelectField
          label="Type"
          options={typeList}
          onChange={(value) => setType(value)}
          value={type}
          error={typeError}
          style={{ marginTop: "22px" }}
          mandatory
        />
        <p className="settingsmapping_categoryfieldlabel">Category</p>
        <Select
          className="maplisttable_selectfield"
          options={categoriesList.map((item) => ({
            value: item.categoryId,
            label: item.categoryName,
          }))}
          value={categoryId}
          onChange={(value) => setCategoryId(value)}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}
