import React, { useState } from "react";
import LineChart from "../chart/LineChart";
import Table from "../table/Table";

const AddendanceDetail = () => {
  const [data1, setData] = useState([]);

  const lineData = {
    labels: [
      "2024-02-01",
      "2024-02-02",
      "2024-02-03",
      "2024-02-04",
      "2024-02-05",
      "2024-02-06",
      "2024-02-07",
    ], // Sample dates
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    present: [65, 59, 80, 81, 56, 55, 40],
    absent: [35, 41, 20, 19, 44, 45, 60],
    attendance: [30, 40, 10, 20, 50],
    averageWorkingHours: [5, 7, 1, 3, 9, 13],
    attendancePercentage: [5, 7, 1, 3, 9, 13],
  };

  const data = [
    {
      employee: "John",
      attendance: "Present",
      workingTime: "8 hours",
      onlineTime: "7 hours",
      breakTime: "1 hour",
    },
    {
      employee: "Alice",
      attendance: "Absent",
      workingTime: "0 hours",
      onlineTime: "0 hours",
      breakTime: "0 hours",
    },
    // More data...
  ];

  const columns = [
    { title: "Employee", key: "employee", width: "150px" },
    { title: "Attendance", key: "attendance", width: "150px" },
    { title: "Working Time", key: "workingTime", width: "150px" },
    { title: "Online Time", key: "onlineTime", width: "150px" },
    { title: "Break Time", key: "breakTime", width: "150px" },
  ];

  return (
    <div>
      <div className=" col-span-1 shadow-lg p-12 max-sm:p-0">
        <h5 className="mb-3 "> Attendance Trend</h5>
        <div className=" h-80">
          <hr />
          <LineChart
            data={lineData}
            displayFields={[
              "present",
              "absent",
              "attendance",
              "averageWorkingHours",
            ]}
            yOptions={{ type: "logarithmic", display: true }}
            y1Options={{ type: "linear", display: true, min: 0, max: 24 }}
          />
        </div>
      </div>

      <div>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default AddendanceDetail;
