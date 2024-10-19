import React, { useState } from "react";
import CommonBarChart from "../../Common/CommonBarChart";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import moment from "moment";

const WellnessDetailed = () => {
  const columns = [
    {
      title: "Employee",
      dataIndex: "full_Name",
      key: "full_Name",
      width: "220px",
      render: (text, record) => {
        return (
          <div className="breakreport_employeenameContainer">
            <CommonAvatar avatarSize={30} itemName={text} />
            <p className="reports_avatarname">{text}</p>
          </div>
        );
      },
    },
    {
      title: "Total Present",
      dataIndex: "totalpresent",
      key: "totalpresent",
      width: "150px",
    },
    {
      title: "Healthy",
      dataIndex: "healthy",
      key: "healthy",
      width: "170px",
      // render: (text, record) => {
      //   if (text === "0001-01-01T00:00:00" || text === null) {
      //     return "00h:00m";
      //   }
      //   return <p>{moment(text, "HH:mm:ss").format("HH[h]:mm[m]")}</p>;
      // },
    },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "overburdened",
      width: "170px",
    },
    {
      title: "Underutilized",
      dataIndex: "underutilized",
      key: "underutilized",
      width: "180px",
    },
    {
      title: "Healthy%",
      dataIndex: "helthyPercentage",
      key: "helthyPercentage",
      width: "170px",
    },
    {
      title: "Overburdened%",
      dataIndex: "overburdenedPercentage",
      key: "overburdenedPercentage",
      width: "170px",
    },
    {
      title: "Underutilized%",
      dataIndex: "underutilizedPercentage",
      key: "underutilizedPercentage",
      width: "170px",
    },
  ];

  const data = [
    {
      id: 1,
      full_Name: "Balaji R",
      totalpresent: 2,
      healthy: 4,
      overburdened: 2,
      underutilized: 0,
      helthyPercentage: 66.6,
      overburdenedPercentage: 14,
      underutilizedPercentage: 0,
    },
  ];

  const Series = [
    {
      name: "Present",
      data: [10, 41, 35, 51],
    },
    {
      name: "Underutilized",
      data: [23, 42, 35, 27],
    },
  ];

  return (
    <div>
      <div className="devices_chartsContainer">
        <p className="devices_chartheading">Working Time Trends</p>
        <CommonBarChart
          xasis={["12/10/2024", "13/10/2024", "14/10/2024", "15/10/2024"]}
          series={Series}
          colors={["#25a17d", "#ABB3B3"]}
        />
      </div>

      <div className="devices_chartsContainer" style={{ marginTop: "20px" }}>
        <p className="devices_chartheading">Employee List</p>
        <CommonTable
          columns={columns}
          dataSource={data}
          scroll={{ x: 1400 }}
          dataPerPage={10}
          bordered="false"
          checkBox="false"
        />
      </div>
    </div>
  );
};
export default WellnessDetailed;
