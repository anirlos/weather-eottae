import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { toggleLike } from "../../redux/slice/heartSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ErrorModal from "./ErrorModal";
import HeartsModal from "./HeartsModal";

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

  const isLoggedIn = true; // 임시 로그인 상태 확인

  const [showErrorModal, setShowErrorModal] = useState(false); // 에러 모달 상태
  const [showHeartsModal, setShowHeartsModal] = useState(false); // 좋아요 유저 모달 상태

  const [heartUsers, setHeartUsers] = useState([]);

  const fetchHeartUsers = async () => {
    try {
      const response = await axios.get(`/api/feed/posts/${postId}/hearts`);
      setHeartUsers(response.data.userList);
    } catch (error) {
      console.error("좋아요 유저 목록 가져오는 중 오류발생:", error);
    }
  };

  useEffect(() => {
    setIsHeart(heartCount > initialHeartCount);
  }, [heartCount, initialHeartCount]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      document.body.style.overflowY = "hidden"; // 모달 열린 경우 전체 스크롤 방지
      setShowErrorModal(true); // 로그인되지 않은 경우 에러 모달 표시
      return;
    }
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDA3NDAxODcsImV4cCI6MTcwMDc0Mzc4Nywic3ViIjoidGVzdEBlbWFpbC5jb20iLCJpZCI6MX0.qwcKaUf6z2_OU_Lv7PlR1c0TjKy-4Bq-LBP3tsWc3aI";
    try {
      const response = await axios.post(
        `http://43.200.188.52:8080/api/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setIsHeart(true);
        setHeartCount(heartCount + 1);
      } else if (response.status === 204) {
        setIsHeart(false);
        setHeartCount(heartCount - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const openModal = () => {
    if (heartCount > 0) {
      document.body.style.overflowY = "hidden"; // 모달 닫힌 경우 전체 스크롤 되돌리기
      fetchHeartUsers();
      setShowHeartsModal(true);
    }
  };

  const closeModal = (modalType: string) => {
    document.body.style.overflowY = "auto";
    if (modalType === "error") {
      setShowErrorModal(false);
    } else if (modalType === "hearts") {
      setShowHeartsModal(false);
    }
  };

  return (
    <HeartContainer>
      <HeartButton onClick={handleLike}>
        {isHeart ? <StyledHeartFill /> : <BsHeart />}
      </HeartButton>

      {heartCount > 0 ? (
        <HeartsModalButton onClick={openModal}>
          좋아요 <span>{heartCount}</span>개
        </HeartsModalButton>
      ) : (
        <p>좋아요</p>
      )}

      {showErrorModal && <ErrorModal onClose={() => closeModal("error")} />}
      {showHeartsModal && (
        <HeartsModal
          heartUsers={heartUsers}
          onClose={() => closeModal("hearts")}
        />
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
