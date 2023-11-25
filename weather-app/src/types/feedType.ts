export interface Feed {
  userImg: string;
  userId: string;
  date: string;
  location: string;
  temperature: number;
  postId: string;
  imgs: string[];
  heartCount: number;
  text: string;
  tags: string[];
}

export interface User {
  memberId: number;
  name: string;
  imageUrl: string;
  nickName: string;
}

export interface Post {
  postId: number;
  userId: number;
  userImg: string;
  userName: string;
  date: string;
  location: string;
  temperature: number;
  mediaUrls: string[];
  content: string;
  liked: boolean;
  likedCount: number;
  hashtagNames: string[];
}

export interface Likers {
  memberId: number;
  name: string;
  imageUrl: string;
  nickName: string;
}
