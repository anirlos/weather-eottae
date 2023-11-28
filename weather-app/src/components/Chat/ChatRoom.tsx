import React, { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import {
  StyledChatRoom,
  ChatRoomListBtn,
  ChatRoomListContainer,
} from "./ChatRoom.styled";
import socket from "../../api/socket";

interface ChatRoomProps {
  currentUserNick: string;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ currentUserNick }) => {
  const [selectedRoom, setSelectedRoom] = useState("서울");

  const rooms = [
    "서울",
    "인천",
    "대전",
    "광주",
    "대구",
    "울산",
    "부산",
    "제주",
  ];

  useEffect(() => {
    // 컴포넌트 마운트시 서울 서버에 자동 접속
    handleRoomSelection("서울");
  }, []); // 빈 배열 전달, 컴포넌트가 처음 마운트될 때만 실행

  // 방 선택하기
  const handleRoomSelection = (room: string) => {
    setSelectedRoom(room); // 선택된 방 상태 업데이트
    socket.emit("join", room);
  };

  return (
    <StyledChatRoom>
      {/* 채팅방 리스트를 나열 로직 */}
      <ChatRoomListContainer>
        {rooms.map((room, index) => (
          // key는 각 요소를 구별하는 데 사용, 예)데이터 ID
          <ChatRoomListBtn
            key={index}
            type="button"
            onClick={() => handleRoomSelection(room)}
            isActive={selectedRoom === room}
          >
            {room}
          </ChatRoomListBtn>
        ))}
      </ChatRoomListContainer>{" "}
      <ChatMessage
        currentUserNick={currentUserNick}
        currentRoom={selectedRoom}
      />
      {/* currentUserNick prop을 전달 */}
    </StyledChatRoom>
  );
};
