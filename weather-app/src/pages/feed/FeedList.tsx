import React, { FC } from "react";
import { Post } from "../../types/feedType";
import FeedItem from "./FeedItem";

interface FeedListProps {
  posts: Post[];
}

const FeedList: FC<FeedListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <FeedItem key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default FeedList;
