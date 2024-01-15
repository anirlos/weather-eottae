import React, { FC, useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { toggleLike, fetchHeartUsers } from "../../api/feed";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ErrorModal from "./ErrorModal";
import HeartsModal from "./HeartsModal";
import useModal from "../../hooks/useModal";

interface FeedHeartsProps {
  postId: number;
  liked: boolean;
  heartCount: number;
}

const FeedHearts: FC<FeedHeartsProps> = ({
  postId,
  liked,
  heartCount: initialHeartCount,
}) => {
  const [isHeart, setIsHeart] = useState(liked);
  const [heartCount, setHeartCount] = useState(initialHeartCount);

  const [heartUsers, setHeartUsers] = useState([]);

  const heartErrorModal = useModal();
  const heartsModal = useModal();

  useEffect(() => {
    setIsHeart(liked);
  }, [liked]);

  const handleLike = useCallback(async () => {
    if (!localStorage.getItem("access_token")) {
      heartErrorModal.open();
      return;
    }

    try {
      const response = await toggleLike(postId);

      if (response.status === 201) {
        setIsHeart(true);
        setHeartCount(heartCount + 1);
      } else if (response.status === 204) {
        setIsHeart(false);
        setHeartCount(heartCount - 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          heartErrorModal.open();
        } else {
          console.error("Error toggling like:", error);
        }
      }
    }
  }, [heartCount, postId, heartErrorModal]);

  const openHeartsModal = useCallback(async () => {
    if (heartCount > 0) {
      const users = await fetchHeartUsers(postId);
      setHeartUsers(users);
      heartsModal.open();
    }
  }, [heartCount, postId, heartsModal]);

  return (
    <HeartContainer>
      <HeartButton onClick={handleLike}>
        {isHeart ? <StyledHeartFill /> : <BsHeart />}
      </HeartButton>

      {heartCount > 0 ? (
        <HeartsModalButton onClick={openHeartsModal}>
          좋아요 <span>{heartCount}</span>개
        </HeartsModalButton>
      ) : (
        <p>좋아요</p>
      )}

      <ErrorModal
        isOpen={heartErrorModal.isOpen}
        onClose={heartErrorModal.close}
      />
      <HeartsModal
        heartUsers={heartUsers}
        isOpen={heartsModal.isOpen}
        onClose={heartsModal.close}
      />
    </HeartContainer>
  );
};

export default FeedHearts;

const HeartContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
`;

const HeartButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 8px;
  padding: 0;
  font-size: 1.25rem;
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
  font-size: 0.875rem;
  line-height: 20px;
  color: #4d4343;
  padding: 0;
`;
