import React, { FC } from "react";
import { Post } from "../../types/feedType";
import FeedItem from "./FeedItem";

interface FeedListProps {
  posts: Post[];
}

const FeedList: FC<FeedListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post, index) => (
        <FeedItem key={post.postId} post={post} isEager={index <= 1} />
      ))}
    </>
  );
};

export default FeedList;
