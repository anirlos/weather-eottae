import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (date: string): string => {
  const now = new Date();
  const dataDate = new Date(date);

  const seconds = Math.floor((now.getTime() - dataDate.getTime()) / 1000);

  let diff = seconds / 31536000;

  if (diff > 1) {
    return Math.floor(diff) + "년전";
  }
  diff = seconds / 2592000;
  if (diff > 1) {
    return Math.floor(diff) + "달전";
  }
  diff = seconds / 86400;
  if (diff > 1) {
    // n주전
    if (Math.floor(diff) % 7 === 0) {
      diff = seconds / 604800;
      if (diff > 1) {
        return Math.floor(diff) + "주전";
      }
    }
    return Math.floor(diff) + "일전";
  }
  diff = seconds / 3600;
  if (diff > 1) {
    return Math.floor(diff) + "시간전";
  }
  // n분전
  diff = seconds / 60;
  if (diff > 1) {
    return Math.floor(diff) + "분전";
  }
  return "방금전";
};

export const formatTimeAgo = (timestamp: string | number | Date) => {
  const messageTime = new Date(timestamp);
  const currentTime = new Date();

  if (messageTime > currentTime) {
    // 메시지 시간이 현재 시간보다 미래인 경우
    return "방금 전";
  }

  const result = formatDistanceToNow(messageTime, {
    addSuffix: true,
    locale: ko,
  });

  return result.replace("1분 미만", "방금");
};
