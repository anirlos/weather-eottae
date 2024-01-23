export const postViewerMaxWidth1024px = `@media screen and (max-width: 1024px) {
    h1 {
      font-size: 2.25rem;
    }
  
    h2 {
      font-size: 1.25rem;
    }
  }`;

export const postViewerMaxWidth768px = `@media screen and (max-width: 768px) {
    width: 100%
    font-size: 1rem;
  
    h1 {
      font-size: 1.5rem;
    }
  
    h2 {
        font-size: 1.25rem;
    }
  
    h1,h2,h3,h4 {
      margin-bottom: 0.75rem;
    }
  }`;

export const postViewerMaxWidth430px = `@media screen and (max-width: 768px) {
    h2 {
        font-size: 20px;
    }
  
    p {
        font-size: 15px;
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
