export const BREAKPOINT_LARGE = "large";
export const BREAKPOINT_DESKTOP = "desktop";
export const BREAKPOINT_TABLET = "tablet";
export const BREAKPOINT_PHONE = "phone";

export const sizes = {
  // 각 디스플레이마다 스크린 폭 지정
  large: "1280px",
  desktop: "1024px",
  tablet: "768px",
  phone: "480px",
};

export const mediaQueries = (key: keyof typeof sizes) => {
  return `@media (max-width: ${sizes[key]}px)`;
};

/**
  미디어쿼리 사용방법 

 ex)

 ${mediaQueries(BREAKPOINT_TABLET)} {
   스타일 내용 넣기
   width:100px;
   
  }

 * */
