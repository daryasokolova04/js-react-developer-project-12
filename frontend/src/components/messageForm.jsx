import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "../slices/messagesSlice";

const MessageForm = ({ channelId }) => {
  const username = localStorage.getItem("username");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      const data = { body: value, channelId, username };
      dispatch(createMessage(data));
      setValue("");
    }
  };

  return (
    <form className="new-message-container" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Введите сообщение"
          value={value}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="bi bi-arrow-right-circle h4"></i>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
