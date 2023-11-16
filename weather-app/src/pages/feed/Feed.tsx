import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../../types/feedType";
import FeedList from "./FeedList";

const Feed: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/api/feed/posts")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <FeedList posts={posts} />
    </div>
  );
};

export default Feed;
