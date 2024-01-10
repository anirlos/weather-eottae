export const postViewerMaxWidth1024px = `@media screen and (max-width: 1024px) {
    h2 {
      font-size: 24px;
    }
  
    p {
      font-size: 20px;
    }
  }`;

export const postViewerMaxWidth768px = `@media screen and (max-width: 768px) {
  
  
    h2 {
        font-size: 20px;
    }
  
    p {
        font-size: 15px;
    }
  }`;

export const postViewerMaxWidth430px = `@media screen and (max-width: 768px) {
    h2 {
        font-size: 15px;
    }
  
    p {
        font-size: 10px;
    }
  }`;

/** 
   글로벌미디어쿼리 사용방법

   const ex = styled.div`
   스타일 내용
   
   ${postViewerMaxWidth430px}
   ${postViewerMaxWidth768px}
   `
    * */
