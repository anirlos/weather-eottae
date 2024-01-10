import axiosClient from "./axiosClient";

interface GetPostsParams {
  page: number;
  size: number;
}

const getPosts = async ({ page, size }: GetPostsParams) => {
  const response = await axiosClient.get(`/posts`, { params: { page, size } });
  return response.data;
};

const toggleLike = async (postId: number) => {
  const response = await axiosClient.post(`/post/${postId}/like`);
  return response;
};

const fetchHeartUsers = async (postId: number) => {
  const response = await axiosClient.get(`/post/${postId}/likers`);
  return response.data;
};

const getUserPosts = async (
  nickName: string,
  { page, size }: GetPostsParams
) => {
  const response = await axiosClient.get(`/posts/user/${nickName}`, {
    params: { page, size },
  });
  return response.data;
};

const getTagPosts = async (tag: string, { page, size }: GetPostsParams) => {
  const response = await axiosClient.get(`/posts/hashtag/${tag}`, {
    params: { page, size },
  });
  return response.data;
};

export { getPosts, toggleLike, fetchHeartUsers, getUserPosts, getTagPosts };
