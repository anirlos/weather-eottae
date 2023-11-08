import React from "react";
import { ChatMessage } from "./ChatMessage";
import { StyledChatRoom } from "./ChatRoom.styled";
import { ChatRoomListBtn } from "./ChatRoom.styled";
import { ChatRoomListContainer } from "./ChatRoom.styled";
import { ChatRoomParagraph } from "./ChatRoom.styled";

export const ChatRoom = () => {
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

  return (
    <StyledChatRoom>
      <ChatRoomParagraph>
        <p>
          ⚠️ 우리 모두의 쾌적한 채팅 환경을 위해 비방, 욕설 또는 부적절한 언어의
          사용을 자제해 주시기 바랍니다. ⚠️
        </p>
      </ChatRoomParagraph>
      {/* 채팅방 리스트를 나열하는 로직을 추가합니다. */}
      <ChatRoomListContainer>
        {rooms.map((room, index) => (
          // key는 각 요소를 구별하는 데 사용, 여)데이터 ID
          // index 임의로 사용
          <ChatRoomListBtn key={index} type="button">
            {room}
          </ChatRoomListBtn>
        ))}
      </ChatRoomListContainer>{" "}
      <ChatMessage />
    </StyledChatRoom>
  );
};
