import styled from "styled-components";

export const StyledChatRoom = styled.div`
  padding: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
`;

export const ChatRoomParagraph = styled.p`
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: large;
`;

export const ChatRoomListBtn = styled.button`
  color: #fff;
  margin: 5px;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #5d6dbe;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5faf5a; // hover 상태일 때의 배경색
    color: #fff; // hover 상태일 때의 글자 색
  }
`;

export const ChatRoomListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // 버튼이 여러 줄로 나누어지도록 합니다.
  justify-content: center; // 버튼들을 가운데 정렬합니다.
  align-items: center; // 버튼들을 세로선 상에서 중앙에 배치합니다.
`;
