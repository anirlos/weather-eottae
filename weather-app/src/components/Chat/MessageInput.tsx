import React from "react";
import { StyledMessageInput } from "./MessageInput.styeld";

export const MessageInput = () => {
  return (
    <StyledMessageInput>
      <input type="text" placeholder="메시지를 입력하세요." />
      <button type="submit">보내기</button>
    </StyledMessageInput>
  );
};
