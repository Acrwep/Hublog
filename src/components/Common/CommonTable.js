import React, { useState } from "react";
import { Table } from "antd";

export default function CommonTable({
  columns,
  dataSource,
  dataPerPage,
  tableLayout,
  scroll,
}) {
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Table
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      columns={columns}
      dataSource={dataSource}
      scroll={scroll} // Enable horizontal scrolling
      pagination={paginationConfig}
      tableLayout="fixed"
    />
  );
}
