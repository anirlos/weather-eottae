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
    // 유저의 name을 가져오는 함수
    const fetchAndSetUserName = async () => {
      try {
        const name = await getUserName();
        setUserNick(name || "익명"); // name이 없는 경우 '익명'으로 처리
      } catch (error) {
        console.error("유저 이름을 가져오지 못했습니다:", error);
        // 에러를 적절히 처리
        setUserNick("에러 발생");
      }
    };

    if (localStorage.getItem("access_token")) {
      fetchAndSetUserName();
    }

    // URL에서 쿼리 파라미터 추출 및 방 입장 로직
    const searchParams = new URLSearchParams(window.location.search);
    const newRoomCode = searchParams.get("room_code") || "";
    const newRoomName = searchParams.get("room_name") || "";
    setRoomCode(newRoomCode);
    setRoomName(newRoomName);

    if (newRoomCode) {
      socket.emit("join", newRoomCode);
    }

    // 컴포넌트 언마운트 시 실행될 클린업 함수
    return () => {
      if (newRoomCode) {
        socket.emit("leave", newRoomCode); // 방 퇴장 시 서버에 알림
      }
    };
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
