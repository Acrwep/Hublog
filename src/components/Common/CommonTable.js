import React, { useState } from "react";
import { Table } from "antd";

const CommonTable = ({
  columns,
  dataSource,
  dataPerPage,
  scroll,
  bordered,
  selectedDatas,
  checkBox,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: dataPerPage,
    total: dataSource.length,
    onChange: handlePageChange,
  };

  const rowSelection =
    checkBox === "false"
      ? null
      : {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
            if (selectedDatas) {
              selectedDatas(selectedRows);
            }
          },
          getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            name: record.name,
          }),
        };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
      scroll={scroll} // Enable horizontal scrolling
      pagination={paginationConfig}
      tableLayout="fixed"
      bordered={bordered === "true" ? true : false}
      loading={loading}
    />
  );
};
export default CommonTable;
