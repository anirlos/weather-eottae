import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  path: "/socket.io", // 서버의 path 옵션과 일치
  transports: ["websocket"], // 웹소켓 연결만 사용하도록 설정
});

export default socket;
