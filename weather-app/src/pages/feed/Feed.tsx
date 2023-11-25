import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useInfinite } from "../../hooks/useInfinite";
import useIntersect from "./../../hooks/useIntersect";
import FeedList from "./FeedList";
import Loading from "../../components/loading/Loading";

const Feed: FC = () => {
  const { userId, tag } = useParams<{ userId?: string; tag?: string }>();
  // const [posts, setPosts] = useState([]);
  const [userImg, setUserImg] = useState("");

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     let endpoint = "/api/feed/posts";
  //     if (userId) {
  //       endpoint = `/api/feed/posts/${userId}`;
  //     } else if (tag) {
  //       endpoint = `/api/feed/posts/hashtags/${tag}`;
  //     }
  //     const response = await axios.get(endpoint);

  //     if (userId) {
  //       setUserImg(response.data.userImg);
  //       setPosts(response.data.userFeeds);
  //     } else {
  //       setPosts(response.data);
  //     }
  //   };

  //   fetchPosts();
  // }, [userId, tag]);

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   console.log(token);
  //   axios
  //     .get("http://43.200.188.52:8080/api/posts", {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("content:", res.data.content);
  //       setPosts(res.data.content);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const {
    isPending,
    error,
    data,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  } = useInfinite();

  const onIntersect = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => {
    if (entry.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  const ref = useIntersect(onIntersect);

  if (isPending) return <Loading />;
  if (error)
    return (
      <ErrorContent>
        <p>게시물을 불러오던 중 오류가 발생했습니다</p>
      </ErrorContent>
    );

  const posts = data?.pages.flatMap((page) => page.content) || [];

  console.log("posts:", posts);

  return (
    <Container>
      {posts.length <= 0 && (
        <ErrorContent>
          <p>등록된 게시물이 없습니다</p>
        </ErrorContent>
      )}
      <FilteredContent>
        {userId && (
          <UserContainer>
            <img src={userImg} alt={`${userId} 프로필 이미지`} />
            <p>{userId}</p>
          </UserContainer>
        )}
        {tag && <Tag>#{tag}</Tag>}
      </FilteredContent>

      <FeedList posts={posts} />
      {isFetchingPreviousPage ? (
        <p>로딩중...</p>
      ) : !hasNextPage ? (
        <p>게시물이 더 이상 존재하지 않습니다.</p>
      ) : null}
      <div ref={ref} />
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  @media (max-width: 430px) {
    background-color: #fff;
    padding-top: 70px;
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
  @media (max-width: 430px) {
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
  @media (max-width: 430px) {
    margin-top: 20px;
  }
`;
