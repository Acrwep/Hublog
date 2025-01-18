import React, { useState } from "react";
import { Skeleton } from "antd";
import CommonBarChart from "../../Common/CommonBarChart";
import CommonAvatar from "../../Common/CommonAvatar";
import CommonTable from "../../Common/CommonTable";
import moment from "moment";
import { useSelector } from "react-redux";
import CommonNodatafound from "../../Common/CommonNodatafound";

const WellnessDetailed = ({ loading }) => {
  const wellnessWorktimeTrendsData = useSelector(
    (state) => state.wellnessworktimetrends
  );

  const wellnessWorktimeTrendsXasis = wellnessWorktimeTrendsData.map((item) =>
    moment(item.date).format("DD/MM/YYYY")
  );

  const wellnessEmployeesListData = useSelector(
    (state) => state.wellnessemployeeslist
  );

  const wellnessWorktimeTrendsSeries = [
    {
      name: "Healthy",
      data: wellnessWorktimeTrendsData.map((item) => {
        return item?.healthyCount || 0;
      }),
    },
    {
      name: "Overburdened",
      data: wellnessWorktimeTrendsData.map((item) => {
        return item?.overburdenedCount || 0;
      }),
    },
    {
      name: "Underutilized",
      data: wellnessWorktimeTrendsData.map((item) => {
        return item?.underutilizedCount || 0;
      }),
    },
  ];

  const columns = [
    {
      title: "Employee",
      dataIndex: "fullName",
      key: "fullName",
      width: 220,
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
      dataIndex: "attendanceCount",
      key: "attendanceCount",
      width: 150,
    },
    {
      title: "Healthy",
      dataIndex: "healthy",
      key: "healthy",
      width: 170,
    },
    {
      title: "Overburdened",
      dataIndex: "overburdened",
      key: "overburdened",
      width: 170,
    },
    {
      title: "Underutilized",
      dataIndex: "underutilized",
      key: "underutilized",
      width: 180,
    },
    {
      title: "Healthy%",
      dataIndex: "healthyPercentage",
      key: "healthyPercentage",
      width: 170,
      render: (text, record) => {
        return <p>{text + "%"}</p>;
      },
    },
    {
      title: "Overburdened%",
      dataIndex: "overburdenedPercentage",
      key: "overburdenedPercentage",
      width: 170,
      render: (text, record) => {
        return <p>{text + "%"}</p>;
      },
    },
    {
      title: "Underutilized%",
      dataIndex: "underutilizedPercentage",
      key: "underutilizedPercentage",
      width: 170,
      render: (text, record) => {
        return <p>{text + "%"}</p>;
      },
    },
  ];

  return (
    <div>
      <div className="devices_chartsContainer">
        {loading ? (
          <Skeleton
            active
            title={{ width: 140 }}
            style={{ height: "45vh" }}
            paragraph={{
              rows: 0,
            }}
          />
        ) : (
          <>
            <p className="devices_chartheading">Working Time Trends</p>
            {wellnessWorktimeTrendsData.length >= 1 ? (
              <CommonBarChart
                xasis={wellnessWorktimeTrendsXasis}
                series={wellnessWorktimeTrendsSeries}
                colors={["#25a17d", "rgba(37,143,161,0.90)", "#ABB3B3"]}
              />
            ) : (
              <CommonNodatafound />
            )}
          </>
        )}
      </div>

      <div className="devices_chartsContainer" style={{ marginTop: "20px" }}>
        <p className="devices_chartheading">Employee List</p>
        <CommonTable
          columns={columns}
          dataSource={wellnessEmployeesListData}
          scroll={{ x: 1400 }}
          dataPerPage={10}
          size="small"
          bordered="false"
          checkBox="false"
          loading={loading}
        />
      </div>
    </div>
  );
};
export default WellnessDetailed;
