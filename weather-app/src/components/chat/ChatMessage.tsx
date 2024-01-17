import React, { useState, useEffect } from "react";
import { StyledChatMessage, MessageBubble } from "./ChatMessage.styled";
import socket from "../../api/socket";
import { formatTimeAgo } from "../../utils/dateUtil";

interface Message {
  nick: string;
  msg: string;
  timestamp: string; // ISO 형식의 날짜 문자열을 가정
}

interface ChatMessageProps {
  currentUserNick: string; // 현재 사용자의 닉네임을 받기 위한 prop
  currentRoom: string; // 새로운 prop 추가
}

export const ChatMessage = ({
  currentUserNick,
  currentRoom,
}: ChatMessageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("message", handleNewMessage);

    return () => {
      // 채팅방 변경시 메시지 배열을 초기화
      setMessages([]);
      socket.off("message", handleNewMessage); // 리스너 제거
    };
  }, [currentRoom]); // 방이 변경될 때마다 실행

  return (
    <StyledChatMessage>
      {[...messages].reverse().map((messageData, index) => {
        const timeAgo = formatTimeAgo(messageData.timestamp);
        return (
          <MessageBubble key={index} own={messageData.nick === currentUserNick}>
            <div className="header">
              <span className="nickname">{messageData.nick}</span>
              <span className="timestamp">{timeAgo}</span>
            </div>
            <div className="message">{messageData.msg}</div>
          </MessageBubble>
        );
      })}
    </StyledChatMessage>
  );
};
