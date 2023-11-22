import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import FeedList from "./FeedList";

const Feed: FC = () => {
  const { userId, tag } = useParams<{ userId?: string; tag?: string }>();
  const [posts, setPosts] = useState([]);
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      let endpoint = "/api/feed/posts";
      if (userId) {
        endpoint = `/api/feed/posts/${userId}`;
      } else if (tag) {
        endpoint = `/api/feed/posts/hashtags/${tag}`;
      }
      const response = await axios.get(endpoint);

      if (userId) {
        setUserImg(response.data.userImg);
        setPosts(response.data.userFeeds);
      } else {
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, [userId, tag]);

  return (
    <Container>
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
    font-size: 30px;
    color: #5d6dbe;
  }
  @media (max-width: 430px) {
    img {
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
    p {
      font-size: 20px;
      margin-top: 10px;
    }
  }
`;

const Tag = styled.p`
  color: #5d6dbe;
  font-size: 30px;
  margin: 10px 0;
  @media (max-width: 430px) {
    margin-top: 20px;
  }
`;
