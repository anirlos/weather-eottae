import styled, { keyframes } from "styled-components";

// 모달 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 모달 배경
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검은색
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
`;

// 모달 컨테이너
export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  // box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 300px;
  animation: ${fadeIn} 0.3s ease-out;
  text-align: center;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

// 모달 내용
export const ModalContent = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.2rem;
`;

// 모달 닫기 버튼
export const ModalCloseButton = styled.button`
  padding: 10px 20px;
  background-color: #5d6dbe;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #5faf5a;
  }
`;
