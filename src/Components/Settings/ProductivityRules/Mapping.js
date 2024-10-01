import React, { useState } from "react";
import { Row, Col, Tooltip, Button, Select } from "antd";
import CommonSearchField from "../../Common/CommonSearchbar";
import CommonSelectField from "../../Common/CommonSelectField";
import { RedoOutlined } from "@ant-design/icons";
import CommonTable from "../../Common/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";

export default function Mapping() {
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => state.categories);
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
  const [categoryId, setCategoryId] = useState(null);

  const tableData = [
    { id: 1, type: "App", details: "Instagram", category: 1 },
    { id: 1, type: "Url", details: "www.hublog.com", category: 2 },
  ];
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (text) => {
        return <p style={{ fontWeight: "600" }}>{text}</p>;
      },
    },
    {
      title: "Details",
      dataIndex: "details",
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
          // <CommonSelectField
          //   options={categoriesList}
          //   value={text}
          //   onChange={(value) => setCategoryId(value)}
          //   style={{ width: "168px" }}
          // />
          <Select
            placeholder="Selecet category"
            options={categoriesList.map((item) => ({
              value: item.categoryId,
              label: item.categoryName,
            }))}
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
            style={{ width: "170px" }}
          />
        );
      },
    },
  ];

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
      <CommonTable
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 600 }}
        dataPerPage={10}
        checkBox="false"
        size="small"
      />
    </div>
  );
}
