import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip, Button, Select } from "antd";
import CommonSearchField from "../../Common/CommonSearchbar";
import CommonSelectField from "../../Common/CommonSelectField";
import { RedoOutlined } from "@ant-design/icons";
import CommonTable from "../../Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { IoGlobeOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import "../styles.css";
import {
  getImbuildAppsandUrls,
  updateImbuildAppsandUrls,
} from "../../APIservice.js/action";
import { CommonToaster } from "../../Common/CommonToaster";
import { storeImbuildAppsandUrls } from "../../Redux/slice";

export default function Mapping() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);
  const ImbuildAppsandUrls = useSelector((state) => state.imbuildappsandurls);
  const [search, setSearch] = useState("");
  const [showId, setShowId] = useState(null);
  const [mappedStatusId, setMappedStatusId] = useState(null);
  const showAll = [
    { id: 1, name: "Show All" },
    { id: 2, name: "Apps" },
    { id: 3, name: "Urls" },
  ];
  const MappedStatus = [
    { id: 1, name: "Mapped" },
    { id: 2, name: "Unmapped" },
  ];
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

  const handleCategory = async (value, id) => {
    console.log(value);
    setLoading(true);
    const payload = {
      categoryId: value,
    };
    console.log("payload", payload);
    try {
      const response = await updateImbuildAppsandUrls(id, payload);
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
    try {
      const response = await getImbuildAppsandUrls();
      console.log(response);
      dispatch(storeImbuildAppsandUrls(response?.data));
    } catch (error) {
      dispatch(storeImbuildAppsandUrls([]));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12}>
          <CommonSearchField
            placeholder="Search user..."
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
              onChange={(value) => setShowId(value)}
              style={{ marginRight: "12px", width: "102px" }}
            />
            <CommonSelectField
              placeholder="Show All"
              options={MappedStatus}
              value={mappedStatusId}
              onChange={(value) => setMappedStatusId(value)}
              style={{ width: "124px" }}
            />
            <Tooltip placement="top" title="Refresh">
              <Button
                className="dashboard_refresh_button"
                style={{ marginLeft: "12px" }}
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
          dataPerPage={100}
          checkBox="false"
          size="small"
          loading={loading}
        />
      </div>
    </div>
  );
}
