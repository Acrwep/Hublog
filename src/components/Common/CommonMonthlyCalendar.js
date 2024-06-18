import React from "react";
import { Calendar } from "antd";
import moment from "moment/moment";
import "./commonstyles.css";

export default function CommonMonthlyCalendar() {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const dateFullCellRender = (value) => {
    const currentDate = moment();
    const isCurrentMonth = value.month() === moment().month();
    const isSunday = value.day() === 0;
    const isToday = value.isSame(currentDate, "day");
    console.log("calendarrrrrr", isToday);

    if (isCurrentMonth && isSunday) {
      return (
        <div className="sunday" style={{ color: "red" }}>
          {value.date()}
        </div>
      );
    }

    if (isCurrentMonth && isToday) {
      return (
        <div className="commoncalendar_currentdate">
          <p>{value.date()}</p>
        </div>
      );
    }

    return value.date();
  };

  return (
    <div>
      <Calendar
        className="common_calendar"
        fullscreen={false}
        onPanelChange={onPanelChange}
        mode="month"
        fullCellRender={dateFullCellRender}
        headerRender={() => {
          <p>Hii</p>;
        }}
      />
    </div>
  );
}
