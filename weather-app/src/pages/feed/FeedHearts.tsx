import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface FeedHeartsProps {
  heartCount: number;
  postId: string;
}

const FeedHearts: FC<FeedHeartsProps> = ({ heartCount, postId }) => {
  const [isHeart, setIsHeart] = useState(false);

  return (
    <HeartContainer>
      <HeartButton>{isHeart ? <StyledHeartFill /> : <BsHeart />}</HeartButton>

      {heartCount > 0 ? (
        <HeartsModalButton>
          좋아요 <span>{heartCount}</span>개
        </HeartsModalButton>
      ) : (
        <p>좋아요</p>
      )}
    </HeartContainer>
  );
};

export default FeedHearts;

const HeartContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
  p {
    font-size: 14px;
  }
`;

const HeartButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 8px;
  padding: 0;
  font-size: 20px;
  display: flex;
  :hover {
    opacity: 0.6;
    transition: all 0.1s ease-in-out;
  }
`;

const StyledHeartFill = styled(BsHeartFill)`
  color: #5d6dbe;
`;

const HeartsModalButton = styled.button`
  border: none;
  background-color: transparent;
  font-family: "Jua", sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #4d4343;
  padding: 0;
`;
