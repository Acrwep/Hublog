import React, { useState } from "react";
import { Calendar } from "antd";
import moment from "moment/moment";
import "./commonstyles.css";

export default function CommonMonthlyCalendar({ monthlyCalendarSelectedDate }) {
  const [selectedDate, setSelectedDate] = useState(null); // State to keep track of the selected date

  const onDateSelect = (value) => {
    console.log("Selected Date:", value.format("YYYY-MM-DD"));
    monthlyCalendarSelectedDate(value.format("YYYY-MM-DD"));
    setSelectedDate(value); // Update the selected date
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateFullCellRender = (value) => {
    const currentDate = moment();
    const isCurrentMonth = value.month() === moment().month();
    const isSunday = value.day() === 0;
    const isToday = value.isSame(currentDate, "day");
    const isSelected = selectedDate && value.isSame(selectedDate, "day"); // Check if the date is the selected one
    // console.log("calendarrrrrr", isToday);

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

    return (
      <div className={`${isSelected ? "commoncalendar_selecteddate" : ""}`}>
        {value.date()}
      </div>
    );
  };
  const disabledDate = (current) => {
    // Disable dates that are after today
    return current && current > moment().endOf("day");
  };
  return (
    <div>
      <Calendar
        className="common_calendar"
        fullscreen={false}
        onSelect={onDateSelect} // Trigger when clicking a date
        onPanelChange={onPanelChange}
        mode="month"
        fullCellRender={dateFullCellRender}
        disabledDate={disabledDate}
        headerRender={() => {
          <p>Hii</p>;
        }}
      />
    </div>
  );
}
