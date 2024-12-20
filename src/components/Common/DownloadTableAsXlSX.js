import * as XLSX from "xlsx";
import moment from "moment";

const DownloadTableAsXlSX = (data, columns, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Map columns and data to create a worksheet
  const worksheetData = [
    columns.map((column) => column.title), // headers
    ...data.map((row) =>
      columns.map((column) => {
        // Handle nested in/out times
        const columnData = column.dataIndex;
        if (Array.isArray(columnData)) {
          const dateKey = columnData[0];
          const timeType = columnData[1];

          const logData = row[dateKey];
          if (logData && logData[timeType]) {
            if (logData[timeType] === "weeklyoff") {
              return "Weekly off";
            } else if (logData[timeType] !== "0001-01-01T00:00:00") {
              return moment(logData[timeType]).format("hh:mm A");
            }
          }
          return null;
        }

        // Format time fields using moment
        if (
          column.dataIndex === "start_Time" ||
          column.dataIndex === "end_Time"
        ) {
          return row[column.dataIndex]
            ? moment(row[column.dataIndex]).format("hh:mm A")
            : null;
        }
        //daily attendance table logics
        if (column.dataIndex === "inTime" || column.dataIndex === "out") {
          if (row[column.dataIndex] === "0001-01-01T00:00:00") {
            return null;
          } else {
            return row[column.dataIndex]
              ? moment(row[column.dataIndex]).format("hh:mm A")
              : null;
          }
        }

        if (column.dataIndex === "triggeredTime") {
          if (row[column.dataIndex] === "0001-01-01T00:00:00") {
            return null;
          } else {
            return row[column.dataIndex]
              ? moment(row[column.dataIndex]).format("hh:mm A")
              : null;
          }
        }

        if (column.dataIndex === "totalTime") {
          if (row[column.dataIndex] === "0001-01-01T00:00:00") {
            return null;
          } else {
            return row[column.dataIndex]
              ? moment(row[column.dataIndex]).format("HH[h]:mm[m]:ss[s]")
              : null;
          }
        }
        if (
          column.dataIndex === "online_duration" ||
          column.dataIndex === "OnlineDuration" ||
          column.dataIndex === "BreakDuration" ||
          column.dataIndex === "breakDuration" ||
          column.dataIndex === "idleDuration" ||
          column.dataIndex === "activeTime" ||
          column.dataIndex === "TotalProductiveDuration" ||
          column.dataIndex === "TotalNeutralDuration" ||
          column.dataIndex === "TotalUnproductiveDuration" ||
          column.dataIndex === "totalUsage"
        ) {
          if (row[column.dataIndex] === "0001-01-01T00:00:00") {
            return null;
          } else {
            const [hours, minutes, seconds] = row[column.dataIndex].split(":");
            return `${hours}h:${minutes}m:${seconds}s`;
          }
        }

        if (
          column.dataIndex === "usagePercentage" ||
          column.dataIndex === "activePercentage" ||
          column.dataIndex === "PercentageProductiveDuration"
        ) {
          return row[column.dataIndex].toFixed(2) + "%";
        }

        if (column.dataIndex === "onlineTime") {
          const [date, time] = row[column.dataIndex].split("T"); // Split date and time
          const [hours, minutes, seconds] = time.split(":"); // Split time into h, m, s
          return `${hours}h:${minutes}m:${seconds}s`;
        }
        return row[column.dataIndex]; // other fields
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

export default DownloadTableAsXlSX;
