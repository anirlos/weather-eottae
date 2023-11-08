import React from "react";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { MessageInput } from "../../components/Chat/MessageInput";
import ChatLocation from "../../components/Chat/ChatLocation";
import { ChatViewContainer } from "./ChaView.styled";

const ChatView = () => {
  return (
    <ChatViewContainer>
      <ChatLocation />
      <MessageInput />
      <ChatRoom />
    </ChatViewContainer>
  );
};

export default ChatView;
