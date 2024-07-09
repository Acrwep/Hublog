import React from "react";
import CommonTable from "../Common/CommonTable";

export default function ApprovedManualTime() {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "120px",
    },
    {
      title: "Start time",
      dataIndex: "starttime",
      key: "starttime",
      width: "120px",
    },
    {
      title: "End time",
      dataIndex: "endtime",
      key: "endtime",
      width: "120px",
    },
    {
      title: "Created date",
      dataIndex: "createddate",
      key: "createddate",
      width: "120px",
    },
    {
      title: "Time attribution",
      dataIndex: "timeattribution",
      key: "timeattribution",
      width: "120px",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      width: "200px",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: "120px",
    },
    {
      title: "Approved by",
      dataIndex: "approvedby",
      key: "approvedby",
      width: "120px",
    },
  ];
  const data = [
    {
      key: "1",
      date: "07/07/24",
      starttime: "09:23 AM",
      endtime: "11:23 AM",
      timeattribution: "Productive",
      summary: "Lorem Ipsum is simply dummy text.",
      remarks: "",
      approvedby: "Manager",
    },
    {
      key: "2",
      date: "09/07/24",
      starttime: "12:23 AM",
      endtime: "01:23 PM",
      timeattribution: "Productive",
      summary: "Lorem Ipsum has been the industry's",
      remarks: "",
      approvedby: "Manager",
    },
    {
      key: "3",
      date: "12/07/24",
      starttime: "14:23 AM",
      endtime: "16:23 PM",
      timeattribution: "Productive",
      summary: "when an unknown printer took a galley.",
      remarks: "",
      approvedby: "Manager",
    },
    {
      key: "4",
      date: "14/07/24",
      starttime: "16:23 AM",
      endtime: "17:23 PM",
      timeattribution: "Productive",
      summary: "It has roots in a piece of classical.",
      remarks: "",
      approvedby: "Manager",
    },
  ];
  return (
    <div className="breakreport_tableContainer">
      <CommonTable
        columns={columns}
        dataSource={data}
        scroll={{ x: 1400 }}
        dataPerPage={4}
        checkBox="false"
      />
    </div>
  );
}
