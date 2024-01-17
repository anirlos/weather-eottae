import React, { useState, useEffect } from "react";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { MessageInput } from "../../components/Chat/MessageInput";
import { ChatViewContainer } from "./ChaView.styled";
import ChatNotice from "../../components/Chat/ChatNotice";
import socket from "../../api/socket";
import { getUserName } from "../../api/userNameApi";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ChatView = () => {
  const [userNick, setUserNick] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchAndSetUserName = async () => {
      if (accessToken) {
        try {
          const userName = await getUserName();
          setUserNick(userName);
        } catch (error) {
          console.error("유저 이름을 가져오지 못했습니다:", error);
          setUserNick("익명");
        }
      } else {
        setUserNick("익명");
      }
      setIsLoading(false); // 로딩 상태 업데이트
    };

    fetchAndSetUserName();
  }, [accessToken]);

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출 및 방 입장 로직
    const searchParams = new URLSearchParams(window.location.search);
    const newRoomCode = searchParams.get("room_code");
    const newRoomName = searchParams.get("room_name");

    if (newRoomCode) {
      setRoomCode(newRoomCode);
      socket.emit("join", newRoomCode);
    } else {
      setRoomCode("서울"); // 기본 방 코드 설정
    }

    if (newRoomName) {
      setRoomName(newRoomName);
    }
  }, []); // 컴포넌트 마운트 시 실행될 useEffect

  if (isLoading) {
    return <Loading />;
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
