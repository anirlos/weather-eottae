import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../types/feedType";
import { formatDate } from "../../utils/dateUtil";
import FeedHearts from "./FeedHearts";
import FeedSlide from "./FeedSlide";
import { mediaQueries } from "../../styles/MediaStyle";
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  BREAKPOINT_PHONE,
} from "../../styles/MediaStyle";

interface FeedItemProps {
  post: Post;
  isEager: boolean;
}

const FeedItem: FC<FeedItemProps> = ({ post, isEager }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);

  const combinedTextLength =
    post.content.length +
    post.hashtagNames.reduce((acc, tag) => acc + tag.length + 1, 0);
  const showMoreButton = combinedTextLength > 20 || post.content.includes("\n");
  const shouldDisplayFullText =
    combinedTextLength <= 20 && !post.content.includes("\n");

  const displayText =
    isExpanded || shouldDisplayFullText
      ? post.content
      : `${post.content.substring(0, 20)}...`;

  if (!post) {
    return null;
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUserClick = (nickName: string) => {
    navigate(`/feed/${nickName}`);
  };

  const handleTagClick = (tag: string) => {
    const formattedTag = tag.replace("#", "");
    navigate(`/feed/hashtags/${encodeURIComponent(formattedTag)}`);
  };

  return (
    <FeedContainer>
      <FeedContent>
        <FeedHeader>
          <img
            src={post.userImg}
            alt={`${post.nickName} 프로필 이미지`}
            onClick={() => handleUserClick(post.nickName)}
            loading={isEager ? "eager" : "lazy"}
          />
          <div>
            <div>
              <span
                className="user"
                onClick={() => handleUserClick(post.nickName)}
              >
                {post.nickName}
              </span>
              <span className="date">{formatDate(post.date)}</span>
            </div>
            <div>
              <span>{post.location}</span>
              <span>{post.temperature}℃</span>
            </div>
          </div>
        </FeedHeader>

        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <FeedSlide imgs={post.mediaUrls} isEager={isEager} />
        )}

        <FeedHearts
          liked={post.liked}
          heartCount={post.likedCount}
          postId={post.postId}
        />

        <FeedBottom>
          <div className="feed-text">
            <p>{displayText}</p>
            {(isExpanded || shouldDisplayFullText) &&
              post.hashtagNames.length > 0 && (
                <div className="feed-tags">
                  {post.hashtagNames.map((tag, index) => (
                    <Tag key={index} onClick={() => handleTagClick(tag)}>
                      #{tag}
                    </Tag>
                  ))}
                </div>
              )}
          </div>
          {showMoreButton && (
            <MoreButton onClick={toggleExpand}>
              {isExpanded ? "접기" : "더보기"}
            </MoreButton>
          )}
        </FeedBottom>
      </FeedContent>
    </FeedContainer>
  );
};

export default FeedItem;

const FeedContainer = styled.div`
  width: 500px;
  padding: 15px 20px;
  margin: 20px auto 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  ${mediaQueries(BREAKPOINT_DESKTOP)} {
    width: 400px;
  }
  ${mediaQueries(BREAKPOINT_TABLET)} {
    width: 80%;
    max-width: 350px;
  }
  ${mediaQueries(BREAKPOINT_PHONE)} {
    width: calc(100% - 30px);
    padding: 20px 15px;
    margin: 15px auto 0;
    border-radius: 0;
    box-shadow: none;
  }
`;

const FeedContent = styled.div`
  width: 100%;
  margin: auto;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    object-fit: cover;
    margin-right: 10px;
    cursor: pointer;
  }
  div > div {
    span:last-child::before {
      content: "•";
      margin: 0 5px;
    }
    .user {
      cursor: pointer;
    }
    .date {
      color: #6d6d6d;
    }
  }
  div > div:last-child {
    margin-top: 4px;
    span {
      font-size: 0.875rem;
    }
  }
`;

const FeedBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  word-break: break-all;
  .feed-text {
    display: inline-block;
    text-align: left;
    p {
      white-space: pre-line;
    }
  }
  .feed-tags {
    margin-top: 10px;
  }
`;

const Tag = styled.span`
  color: #5d6dbe;
  margin-right: 7px;
  cursor: pointer;
`;

const MoreButton = styled.span`
  margin-top: 10px;
  color: #7e7e7e;
  cursor: pointer;
`;
