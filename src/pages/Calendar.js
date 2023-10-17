import React, { useState } from "react";

import "../sass/calendar.scss";
import ReminderForm from "../components/ReminderForm";

function Calendar() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // add state to keep track of the current month
  // update state when next and prev buttons are clicked
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [remindersForDate, setRemindersForDate] = useState([]);

  const handleAddReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const handleDateClick = (event) => {
    const date = event.target.getAttribute("data-date");
    if (!selectedDate) {
      setSelectedDate(date);
      setRemindersForDate(
        reminders.filter((reminder) => reminder.date === date)
      );
      document.querySelector("div.sidebar").classList.add("show");
    } else if (date === selectedDate) {
      setSelectedDate("");
      document.querySelector("div.sidebar").classList.remove("show");
      return;
    } else {
      setSelectedDate(date);
      setRemindersForDate(
        reminders.filter((reminder) => reminder.date === date)
      );
      document.querySelector("div.sidebar").classList.add("show");
    }
  };

  const handlePreviousClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // If the first day of the month starts on Wednesday, the first row will have blanks for Sunday, Monday, and Tuesday.
  const blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<td key={i}></td>);
  }

  const rows = [];
  let cells = [];
  blanks.forEach((blank) => cells.push(blank));
  days.forEach((day, index) => {
    const isToday =
      `${year}-${month + 1}-${day}` === new Date().toISOString().slice(0, 10);
    const isSelected = `${year}-${month + 1}-${day}` === selectedDate;
    cells.push(
      <td
        key={index + firstDayOfMonth}
        data-date={`${year}-${month + 1}-${day}`}
        onClick={handleDateClick}
        className={`${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
      >
        {day}
      </td>
    );
    if ((index + firstDayOfMonth + 1) % 7 === 0) {
      rows.push(<tr key={index}>{cells}</tr>);
      cells = [];
    }
  });
  if (cells.length > 0) {
    rows.push(<tr key={daysInMonth}>{cells}</tr>);
  }

  return (
    <div className="container">
      <h1>ToDo ToDay</h1>
      <ReminderForm onAddReminder={handleAddReminder} />
      <br></br>
      <span class="month-arrows">
        <button className="previous round" onClick={handlePreviousClick}>
          &#8249;
        </button>
        <h2>{`${new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(date)}`}</h2>
        <button className="next round" onClick={handleNextClick}>
          &#8250;
        </button>
      </span>
      <table className="calendar-table">
        <thead>
          <tr>
            {/* The key prop is used to help React identify which elements have changed, been added, or been removed when the component is updated. */}
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="sidebar">
        <h2>
          Reminders for{" "}
          {new Date(selectedDate).toLocaleDateString("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
          })}
        </h2>
        {remindersForDate.length > 0 ? (
          <ul>
            {remindersForDate.map((reminder) => (
              <li key={reminder.id}>{reminder.text}</li>
            ))}
          </ul>
        ) : (
          <p>No reminders for this date.</p>
        )}
      </div>
    </div>
  );
}

export default Calendar;
