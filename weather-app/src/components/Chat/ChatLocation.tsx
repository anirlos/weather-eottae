import React from "react";
import { ChatLocationParagraph } from "./ChatLocatiom.styled";
import { StyledMyLocationInChat } from "./ChatLocatiom.styled";

const ChatLocation = () => {
  return (
    <>
      <ChatLocationParagraph>
        <p>오늘 날씨에 이 옷 어때? 옷차림 추천 메세지를 보내주세요.</p>
      </ChatLocationParagraph>
      <StyledMyLocationInChat>
        <p>위치 정보</p>
      </StyledMyLocationInChat>
    </>
  );
};

export default ChatLocation;
