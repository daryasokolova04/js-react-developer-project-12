import React from "react";

const Messages = ({ data, channel }) => {
  console.log(channel);
  const username = localStorage.getItem("username");

  const renderPhrase = () => {
    const n = data.length;
    if (n === 2 || n === 3 || n === 4) {
      return `${n} сообщения`;
    } else if (n === 1) {
      return `${n} сообщение`;
    } else {
      return `${n} сообщений`;
    }
  };
  return (
    <div className="messages">
      <div className="messages-header">
        <h2># {channel.name}</h2>
        <p className="fw-light">{renderPhrase()}</p>
      </div>
      <div className="messages-block">
        <ul className="list-group">
          {data.map((message) => {
            return (
              <li className="list-group-item" key={message.id}>
                <b>{username}</b>: {message.body}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Messages;
