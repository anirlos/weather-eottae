import React, { FC, useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useInfinite } from "../../hooks/useInfinite";
import useIntersect from "./../../hooks/useIntersect";
import FeedList from "./FeedList";
import Loading from "../../components/loading/Loading";
import Layout from "../../components/layout/Layout";
import { mediaQueries } from "../../styles/MediaStyle";
import { BREAKPOINT_PHONE, BREAKPOINT_TABLET } from "../../styles/MediaStyle";

const Feed: FC = () => {
  const location = useLocation();

  const { nickName, tag } = useParams<{ nickName?: string; tag?: string }>();

  const [userProfile, setUserProfile] = useState({
    imageUrl: "",
    nickName: "",
  });

  const {
    isPending,
    error,
    refetch,
    data,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  } = useInfinite(nickName, tag);

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 맨 위로
    refetch(); // 데이터 재로딩
  }, [location.key, refetch]);

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  const ref = useIntersect(onIntersect);

  useEffect(() => {
    if (nickName && data?.pages[0]?.memberId) {
      const userData = data.pages[0];
      setUserProfile({
        imageUrl: userData.imageUrl,
        nickName: userData.nickName,
      });
    }
  }, [data, nickName]);

  const posts = useMemo(() => {
    return nickName
      ? data?.pages.flatMap((page) => page.postResponseDtos) || []
      : data?.pages.flatMap((page) => page.content) || [];
  }, [data, nickName]);

  if (isPending)
    return (
      <Layout>
        <Container>
          <Loading />
        </Container>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <Container>
          <ErrorContent>
            <p>게시물을 불러오던 중 오류가 발생했습니다</p>
          </ErrorContent>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <FilteredContent>
          {nickName && (
            <UserContainer>
              <img
                src={userProfile.imageUrl}
                alt={`${nickName} 프로필 이미지`}
              />
              <p>{userProfile.nickName}</p>
            </UserContainer>
          )}
          {tag && <Tag>#{tag}</Tag>}
        </FilteredContent>

        {posts.length <= 0 && (
          <ErrorContent>
            <p>등록된 게시물이 없습니다</p>
          </ErrorContent>
        )}

        <FeedList posts={posts} />

        <LoadingMessage>
          {isFetchingPreviousPage ? (
            <Loader>
              <span></span>
              <span></span>
              <span></span>
            </Loader>
          ) : null}
        </LoadingMessage>

        <div ref={ref} />
      </Container>
    </Layout>
  );
};

export default Feed;

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  margin: 0 auto;
  ${mediaQueries(BREAKPOINT_TABLET)} {
    padding-left: 14px;
  }
  ${mediaQueries(BREAKPOINT_PHONE)} {
    padding: 30px 0 0 0;
  }
`;

const ErrorContent = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const FilteredContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  ${mediaQueries(BREAKPOINT_PHONE)} {
    margin-top: -25px;
  }
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin-right: 10px;
  }
  p {
    font-size: 1.875rem;
    color: #5d6dbe;
  }
  ${mediaQueries(BREAKPOINT_PHONE)} {
    img {
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
    p {
      font-size: 1.25rem;
      margin-top: 10px;
    }
  }
`;

const Tag = styled.p`
  color: #5d6dbe;
  font-size: 1.875rem;
  margin: 10px 0;
  ${mediaQueries(BREAKPOINT_PHONE)} {
    margin-top: 20px;
  }
`;

const LoadingMessage = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loadingCircle = keyframes`
  0%, 100%{
    opacity: 0;
  }
  60%{
    opacity: 1;
  }
`;

const Loader = styled.div`
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #5d6dbe;
    margin-right: 10px;
    opacity: 0;
    &:nth-child(1) {
      animation: ${loadingCircle} 1s ease-in-out infinite;
    }
    &:nth-child(2) {
      animation: ${loadingCircle} 1s ease-in-out 0.33s infinite;
    }
    &:nth-child(3) {
      animation: ${loadingCircle} 1s ease-in-out 0.66s infinite;
      margin-right: 0;
    }
  }
`;
