import React, { useState } from "react";
import socket from "../../api/socket";
import { StyledMessageInput } from "./MessageInput.styeld";
import {
  ModalBackdrop,
  ModalContainer,
  ModalContent,
  ModalCloseButton,
} from "./ChatSendModal";
import useModal from "../../hooks/useModal";

// roomCode와 roomName을 props로 받기
interface IMessageInputProps {
  nick: string;
  roomCode: string;
  roomName: string;
}
// 소켓 연결 시 방 정보를 서버에 전송
export const MessageInput = ({
  nick,
  roomCode,
  roomName,
}: IMessageInputProps) => {
  // 입력 필드의 상태를 관리
  const [message, setMessage] = useState("");
  const { isOpen, open, close } = useModal();

  // 입력 필드 값이 변경될 때 호출되는 함수
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // '보내기' 버튼 클릭 시 서버로 메시지 전송
  const handleSendMessage = () => {
    if (!message.trim()) {
      open();
      return;
    }

    // 메시지 객체 생성
    const messageData = {
      nick, // 사용자 닉네임
      msg: message, // 메시지 내용
      timestamp: new Date().toISOString(), // 메시지 전송 시 타임스탬프 추가
    };
    console.log(`Emitting message event: `, messageData); // 실제 서버에 전달되는 로그
    // 'Message' 이벤트와 함께 메시지 객체 전송
    socket.emit("message", messageData);
    setMessage("");
  };

  const MessageModal = isOpen ? (
    <ModalBackdrop>
      <ModalContainer>
        <ModalContent>
          <p>메시지가 입력되지 않았습니다.</p>
          <p>메시지를 입력하세요.</p>
        </ModalContent>
        <ModalCloseButton onClick={close}>닫기</ModalCloseButton>
      </ModalContainer>
    </ModalBackdrop>
  ) : null;

  // 'Enter' 키로 메시지 보내기
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && message.trim()) {
      event.preventDefault(); // 새로고침 방지
      handleSendMessage();
    }
  };

  return (
    <>
      <StyledMessageInput>
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={handleMessageChange}
          onKeyPress={handleKeyPress}
        />
        <button type="button" onClick={handleSendMessage}>
          보내기
        </button>
      </StyledMessageInput>
      {MessageModal}
    </>
  );
};
