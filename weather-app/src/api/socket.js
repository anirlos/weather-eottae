import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  path: "/socket.io", // 서버의 path 옵션과 일치
  transports: ["websocket"], // 웹소켓 연결만 사용하도록 설정
});

socket.on("disconnect", () => {
  alert("소켓 연결이 끊어졌습니다. 다시 연결해주세요.");
});

socket.on("connect_error", (error) => {
  console.error("소켓 연결 실패:", error);
  alert("소켓 연결에 실패했습니다. 다시 시도해주세요.");
});

export default socket;
