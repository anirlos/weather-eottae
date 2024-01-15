import React, { useState, useEffect } from "react";
import { ChatRoom } from "../../components/chat/ChatRoom";
import { MessageInput } from "../../components/chat/MessageInput";
import { ChatViewContainer } from "./ChaView.styled";
import ChatNotice from "../../components/chat/ChatNotice";
import socket from "../../api/socket";
import { fetchUserName } from "../../api/userNameApi";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";

const ChatView = () => {
  const [userNick, setUserNick] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAndSetUserName = async () => {
      try {
        const userName = await fetchUserName();
        setUserNick(userName);
        setIsLoading(false); // 사용자 이름 로딩 완료 후 로딩 상태 업데이트
      } catch (error) {
        console.error("유저 이름을 가져오지 못했습니다:", error);
        setUserNick("익명");
        setIsLoading(false); // 에러 발생시에도 로딩 상태 업데이트
      }
    };

    if (localStorage.getItem("access_token")) {
      fetchAndSetUserName();
    } else {
      setUserNick("익명");
      setIsLoading(false);
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

  if (isLoading) {
    return <Loading />; // 로딩 중이면 로딩 컴포넌트 렌더링
  }

  return (
    <Layout>
      <ChatViewContainer>
        <ChatNotice />
        <MessageInput nick={userNick} roomCode={roomCode} roomName={roomName} />
        <ChatRoom currentUserNick={userNick} />
      </ChatViewContainer>
    </Layout>
  );
};

export default ChatView;
