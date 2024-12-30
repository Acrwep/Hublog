import * as XLSX from "xlsx";
import moment from "moment";

const DownloadDynamicReport = (data, columns, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Map columns and data to create a worksheet
  const worksheetData = [
    columns.map((column) => column.title), // headers
    ...data.map((row) =>
      columns.map((column) => {
        // Handle nested in/out times
        const columnData = column.dataIndex;
        if (
          columnData === "TotalWorkingtime" ||
          columnData === "TotalOnlinetime" ||
          columnData === "TotalBreaktime" ||
          columnData === "AverageBreaktime" ||
          columnData === "TotalActivetime" ||
          columnData === "AverageActivetime" ||
          columnData === "TotalIdletime" ||
          columnData === "AverageIdletime" ||
          columnData === "Total_Productivetime" ||
          columnData === "Average_Productivetime" ||
          columnData === "Total_neutraltime" ||
          columnData === "Average_neutraltime" ||
          columnData === "Total_unproductivetime" ||
          columnData === "Average_unproductivetime"
        ) {
          if (
            row.records[column.dataIndex] === "0001-01-01T00:00:00" ||
            row.records[column.dataIndex] === undefined
          ) {
            return null;
          } else if (row.records[column.dataIndex] === 0) {
            return "0h:0m:0s";
          } else {
            const [hours, minutes, seconds] =
              row.records[column.dataIndex].split(":");
            return `${hours}h:${minutes}m:${seconds}s`;
          }
        }
        if (
          columnData === "ActivitePercent" ||
          columnData === "Productivity_Percent"
        ) {
          if (row.records[column.dataIndex] === null) {
            return "0.00%";
          } else {
            const convertToNumber = parseInt(row.records[column.dataIndex]);
            return convertToNumber.toFixed(2) + "%";
          }
        }

        if (columnData === "Date") {
          if (row.records[column.dataIndex] === null) {
            return null;
          } else {
            return moment(row.records[column.dataIndex]).format("DD/MM/YYYY");
          }
        }

        if (columnData === "PunchIntime" || columnData === "PunchOuttime") {
          if (row.records[column.dataIndex] === null) {
            return null;
          } else {
            const formattedTime = moment(
              row.records[column.dataIndex],
              "MM/DD/YYYY HH:mm:ss"
            ).format("hh:mm A");
            return formattedTime;
          }
        }

        return row.records[column.dataIndex];
      })
    ), // data rows
  ];

  // Create worksheet from array of arrays
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to file
  XLSX.writeFile(workbook, fileName);
};

export default DownloadDynamicReport;

// [
//   {
//     records: {
//       UserId: 1014,
//       TeamId: 5,
//       FirstName: "Balaji",
//       LastName: "R",
//       EmployeeId: "JKHIUHDIA232",
//       Email: "balaji@gmail.com",
//       TeamName: "Dev",
//       TotalWorkingtime: "0:25:36",
//       TotalOnlinetime: "0:24:25",
//       TotalBreaktime: "0:01:11",
//       AverageBreaktime: "0:00:10",
//       TotalActivetime: "0:24:25",
//       ActivitePercent: "95.38",
//       TotalIdletime: "0:00:00",
//       AverageIdletime: "0:00:00",
//       Total_Productivetime: "00:00:00",
//       Productivity_Percent: 0,
//       Average_Productivetime: "00:00:00",
//       Total_unproductivetime: "00:00:00",
//       Average_unproductivetime: "00:00:00",
//       Total_neutraltime: "00:02:56",
//       Average_neutraltime: "00:00:29",
//     },
//   },
// ];
