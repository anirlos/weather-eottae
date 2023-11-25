import axios from "axios";

const BASE_URL = "http://43.200.188.52:8080/api"; // 올바른 기본 URL 사용

// 'getAuthToken' 함수를 수정하여 로컬 스토리지에서 실제 액세스 토큰을 가져옵니다.
const getAuthToken = () => localStorage.getItem("access_token");

// 유저 정보를 가져오는 함수에서 실제 액세스 토큰을 사용합니다.
const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 정보를 가져오는 중 에러가 발생했습니다.:", error);
    throw error;
  }
};

// 유저 정보에서 이름 가져오기
const getUserName = async () => {
  const userInfo = await getUserInfo();
  return userInfo.name;
};

export { getUserInfo, getUserName };
