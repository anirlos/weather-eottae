import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: #ededed;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

export const Wrap = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 430px) {
    width: 100%;
    padding-bottom: 0;
  }
`;

export const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 50px;

  @media (max-width: 430px) {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
