import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChannels,
  selectors as channelsSelector,
} from "../slices/channelsSlice";
import {
  fetchMessages,
  selectors as messagesSelector,
} from "../slices/messagesSlice";
import Channels from "./channels";
import Messages from "./messages";
import MessageForm from "./messageForm";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  const channels = useSelector(channelsSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  console.log(channels);
  console.log(messages);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    setActiveChannel(channels.find((ch) => ch.name === "general"));
  }, [channels]);

  let filteredMessages = activeChannel
    ? messages.filter((item) => item.channelId === activeChannel.id)
    : [];

  return (
    activeChannel && (
      <div className="chat-container">
        <Channels data={channels} setChannel={setActiveChannel} />
        <Messages data={filteredMessages} channel={activeChannel} />
        <MessageForm channelId={activeChannel.id} />
      </div>
    )
  );
};

export default MainPage;
