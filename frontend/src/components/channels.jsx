import React from "react";

const Channels = ({ data, setChannel }) => {
  return (
    <div className="channels">
      <h2>Каналы</h2>
      <ul className="list-group">
        {data.map((channel) => {
          return (
            <li
              className="list-group-item list-group-item-light"
              key={channel.id}
              onClick={() => setChannel(channel)}
            >
              # {channel.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
