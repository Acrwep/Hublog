import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { Table } from "antd";

const DynamicTable = ({ data, columns }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const valueA = a[sortKey] || "";
        const valueB = b[sortKey] || "";
        if (sortDirection === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      })
    : data;

  return (
    <div className="p-6 overflow-auto">
      <table className="table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 w-auto">
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: "500px" }}
                onClick={() => handleSort(column.key)}
                className="py-2 px-4 cursor-pointer text-start"
              >
                {column.title}{" "}
                {sortKey === column.key &&
                  (sortDirection === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  ))}
              </th>
            ))}
            {/* <th className="py-2 px-4">View</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{ width: column.width }}
                  className="py-2 px-4 text-gray-500 text-sm text-start"
                >
                  {row[column.key]}
                </td>
              ))}
              {/* <td  className="py-2 px-4 text-center">
                Add view icon and functionality here
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

export const AntTable = ({ data, columns }) => {
  return (
    <div>
      <Table
        pagination
        dataSource={data}
        columns={columns}
        tableLayout="fixed"
      />
    </div>
  );
};
