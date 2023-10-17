import React, { useState } from "react";
import "../sass/reminderForm.scss";

function ReminderForm(props) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddReminder({ text, date });
    setText("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <label htmlFor="reminder-input" className="label">
        Reminder:
      </label>
      <input
        id="reminder-input"
        type="text"
        value={text}
        onChange={handleTextChange}
        className="input"
      />
      <label htmlFor="date-input" className="label">
        Date:
      </label>
      <input
        id="date-input"
        type="date"
        value={date}
        onChange={handleDateChange}
        className="input"
      />
      <button type="submit" className="button">
        Add Reminder
      </button>
    </form>
  );
}

export default ReminderForm;
