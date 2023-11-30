import React, { useState, useEffect } from "react";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { MessageInput } from "../../components/Chat/MessageInput";
import { ChatViewContainer } from "./ChaView.styled";
import ChatNotice from "../../components/Chat/ChatNotice";
import socket from "../../api/socket";
import { getUserName } from "../../api/userNameApi";

const ChatView = () => {
  const [userNick, setUserNick] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const fetchAndSetUserName = async () => {
      try {
        const userName = await getUserName();
        setUserNick(userName);
      } catch (error) {
        console.error("유저 이름을 가져오지 못했습니다:", error);
        setUserNick("익명");
      }
    };

    if (localStorage.getItem("access_token")) {
      fetchAndSetUserName();
    }

    // URL에서 쿼리 파라미터 추출 및 방 입장 로직
    const searchParams = new URLSearchParams(window.location.search);
    const newRoomCode = searchParams.get("room_code");
    const newRoomName = searchParams.get("room_name");

    if (newRoomCode) {
      setRoomCode(newRoomCode);
      socket.emit("join", newRoomCode);
    } else {
      setRoomCode("서울"); // 제공된 값이 없을 경우 기본 방 코드로 설정
    }

    if (newRoomName) {
      setRoomName(newRoomName);
    }
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시에만 실행

  return (
    <ChatViewContainer>
      <ChatNotice />
      <MessageInput nick={userNick} roomCode={roomCode} roomName={roomName} />
      <ChatRoom currentUserNick={userNick} />
    </ChatViewContainer>
  );
};

export default ChatView;
