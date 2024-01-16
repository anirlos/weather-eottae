import axiosClient from "./axiosClient";

interface User {
  nickName: string;
  name: string;
}

const fetchUserInfo = async (): Promise<User> => {
  try {
    const response = await axiosClient.get<User>("/user");
    return response.data;
  } catch (error) {
    console.error("유저 정보를 가져오는 중 에러가 발생했습니다.:", error);
  }
};

const getUserName = async (): Promise<string> => {
  try {
    const userInfo = await fetchUserInfo();
    return userInfo ? userInfo.nickName || userInfo.name : "익명";
  } catch (error) {
    return "익명"; // 에러가 발생하면 "익명"을 반환
  }
};

export { fetchUserInfo, getUserName };
