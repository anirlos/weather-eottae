import axiosClient from "./axiosClient";

interface User {
  nickName: string;
  name: string;
}

const getUserInfo = async (): Promise<User> => {
  try {
    const response = await axiosClient.get<User>("/user");
    return response.data;
  } catch (error) {
    console.error("유저 정보를 가져오는 중 에러가 발생했습니다.:", error);
    throw error;
  }
};

const getUserName = async (): Promise<string> => {
  const userInfo = await getUserInfo();
  return userInfo.nickName || userInfo.name || "익명";
};

export { getUserInfo, getUserName };
