import React, { useEffect, useState } from "react";
// import DoughnutChart from "../../components/chart/DoughnutChart";
import { AntTable } from "../../components/table/Table";
import { Calendar, Tooltip, Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import { formatDate, formatDuration } from "../../components/Utils";
import dayjs from "dayjs";
import moment from "moment";
import {
  UserOutlined,
} from '@ant-design/icons';

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const DoughnutChart = ({ attendance: { presentCount, absentCount } }) => {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Present", "Absent"],
    colors: ["#66AFF4", "#CCCCCC"], // Blue and Gray colors
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
            },
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: function (val) {
                return val; // Display value in the tooltip
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val; // Display value in the tooltip
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };
  const series = [presentCount, absentCount];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={300}
      />
    </div>
  );
};

const UserDetailAttendance = ({ monthlyInOut }) => {
  const [dates, setDates] = useState();
  const [calendarValue, setCalendarValue] = useState();
  const [attendance, setAttendance] = useState({
    presentCount: 0,
    absentCount: 0,
  });
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
      let presentCount = 0;
      let absentCount = 0;
      const dateValues = Object.keys(monthlyInOut);
      setDates(dateValues);
      dateValues.forEach((k) => {
        if (monthlyInOut?.[k]?.[0]?.att_status === "P") presentCount++;
        if (monthlyInOut?.[k]?.[0]?.att_status === "A") absentCount++;
      });
      setAttendance({ presentCount, absentCount });

      const data = dateValues.map((k) => {
        const thisData = monthlyInOut?.[k]?.[0];
        if(thisData){
        return {
          ...thisData,
          date: formatDate(k, "DD/MMM/yyyy"),
          punch_in: thisData.punch_in ? <div><UserOutlined /> <>{formatDate(thisData.punch_in, "hh:mm A")}</></div> : "",
          punch_out: thisData.punch_out ? <div><UserOutlined /> <>{formatDate(thisData.punch_out, "hh:mm A")}</></div> : "",
          punch_duration: thisData.punch_duration ? formatDuration(thisData.punch_duration) : ""
        };
      }
      });
      setTableData(data);
      return () => true;
  }, [monthlyInOut]);

  useEffect(() => {
    if (dates?.[0]) {
      setCalendarValue(dayjs(dates[0]));
    }
  }, [dates])

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "150px",
    },
    { title: "In", dataIndex: "punch_in", key: "punch_in", width: "150px" },
    { title: "Out", dataIndex: "punch_out", key: "punch_out", width: "150px" },
    {
      title: "Duration",
      dataIndex: "punch_duration",
      key: "punch_duration",
      width: "150px",
    },
    { title: "Logs", dataIndex: "logs", key: "logs", width: "150px" },
  ];

  const renderCell = (dateX) => {
    const date = dateX.format("YYYY-MM-DD");

    // Check if date exists
    if (dates?.includes(date)) {
      const status = monthlyInOut?.[date]?.[0]?.workplace;

      // Determine tooltip content based on status
      let tooltipContent = '';
      switch (status) {
        case "absent":
          tooltipContent = 'Absent';
          break;
        case "full_day":
          tooltipContent = 'Full Day';
          break;
        case "half_day":
          tooltipContent = 'Half Day';
          break;
        default:
          tooltipContent = '';
      }

      // Construct class name based on status
      const className = status ? `rounded-full w-2 h-2 ${status === 'absent' ? 'bg-red-600' : status === 'full_day' ? 'bg-green-600' : 'bg-yellow-400'}` : '';

      // Return cell wrapped with Tooltip
      return (
        <Tooltip title={tooltipContent} key={date}>
          <div style={{ padding: "4px 0 4px 8px" }}>
            <div className={className}></div>
          </div>
        </Tooltip>
      );
    }
    return null;
  };

  const onSelect = (newValue) => {
    setCalendarValue(newValue);
  }

  return (
    <div>
      <div className="grid grid-cols-3 shadow-md gap-3">
        <div className="col-span-1">
          <div className=" col-span-1 shadow-lg p-6">
            <h5 className="mb-3">Attendance</h5>
            <hr />
            <div>
              <DoughnutChart {...{ attendance }} />
            </div>
            <div className="flex justify-center w-full mt-2">
              <div className="flex">
                <div className=" w-2 h-6 bg-blue-600 rounded-lg mx-2"></div>
                {attendance.presentCount}
              </div>
              <div className="flex">
                <div className=" w-2 h-6 bg-gray-600 rounded-lg mx-2"></div>
                {attendance.absentCount}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 shadow-lg">
          {dates?.length > 0 &&
            <Calendar
              cellRender={renderCell}
              fullscreen={false}
              //onPanelChange={onPanelChange}
              value={calendarValue}
              defaultValue={calendarValue}
              validRange={[dayjs(dates[0]), dayjs(dates[dates?.length-1])]}
              headerRender={() => <div style={{ padding: "16px 16px 8px" }}><Typography.Title level={5}>Monthly Attendance</Typography.Title></div>}
              onSelect={onSelect}
            />
          }
        </div>
      </div>

      <div className="w-full shadow-lg p-4">
        <p>Detail</p>
        <div>
          <AntTable data={tableData} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailAttendance;
