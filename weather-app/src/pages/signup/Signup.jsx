import React, { useState } from "react";
import styled from "styled-components";
import weather from "../../assets/img/signup/weather.png";
import devicon_google from "../../assets/img/login/devicon_google.png";
import kakao from "../../assets/img/login/kakao.png";
import Postcode from "../../components/login/Postcode";

//유효성 검사, 비번확인, 미디어파일전송
const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    nickName: "",
    email: "",
    password: "",
    address: "",
    message: "",
    userImg: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("통신");
  };

 

  return (
    <Container>
      <div className="cover-img">
        <img src={weather} alt="login" height="100%" width="720px" />
      </div>
      <div className="signup-container">
        <div className="signup-form">
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <div className="second-container">
              <label htmlFor="userName">이름</label>
              <input
                type="text"
                value={userInfo.userName}
                name="userName"
                id=""
                onChange={handleChange}
              />

              <label htmlFor="userName">닉네임</label>
              <input
                type="text"
                value={userInfo.nickName}
                name="userId"
                id=""
                onChange={handleChange}
              />

              <label htmlFor="email">email</label>
              <input
                type="text"
                value={userInfo.email}
                name="email"
                id=""
                onChange={handleChange}
              />
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                value={userInfo.password}
                name="password"
                id=""
                onChange={handleChange}
              />
              {/*다음 주소*/}
              <Postcode />
              {/*일반주소
              <label htmlFor="address">주소 입력</label>
              <input
                type="text"
                value={userInfo.address}
                name="address"
                id=""
                onChange={handleChange}
               /> */}
              <label htmlFor="message">
                회원들에게 보일 인삿말과 프로필사진을 등록해보세요
              </label>
              <input
                type="textarea"
                value={userInfo.message}
                name="message"
                id=""
                onChange={handleChange}
              ></input>
              <input
                type="file"
                value={userInfo.userImg}
                name="file"
                id=""
                onChange={handleChange}
              ></input>
            </div>

            <button>회원가입</button>
          </form>
          <div className="line-container">
            <div className="line">
              <hr className="line" />
              <p>Or</p>
              <hr className="line" />
            </div>
            <div className="social-login">
              <img src={devicon_google} alt="google" />
              <img src={kakao} alt="kakao" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  .signup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    width: 720px;
  }
  .signup-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 70%;
    margin: 0 auto;
    row-gap: 20px;
  }

  h1 {
    font-size: 36px;
  }

  .second-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  input[type="text"],
  input[type="password"] {
    margin: 0 auto;
    height: 35px;
    width: 400px;
    color: black;
    border: 0.2px solid black;
    border-radius: 10px;
    outline: none;
  }

  input[type="textarea"] {
    margin: 0 auto;
    height: 80px;
    width: 400px;
    color: black;
    border: 0.2px solid black;
    border-radius: 10px;
    outline: none;
  }

  input[type="textarea"] {
    margin: 0 auto;
    height: 80px;
    width: 400px;
    color: black;
    border: 0.2px solid black;
    border-radius: 10px;
    outline: none;
  }

  input[type="file"]::file-selector-button {
    width: 150px;
    height: 30px;
    background: #fff;
    border: 1px solid rgb(77, 77, 77);
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(77, 77, 77);
      color: #fff;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 400px;
    background-color: #7376ff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    margin: 0 auto;
  }
  .custom, .custom-two {
    background-color: black;
    color: white;
    width: 110px;
    height: 20px;
    border: 1px solid black;
    border-radius: none;
    font-size: 12px;

  }

  .line-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .line {
    display: flex;
    width: 100%;
  }

  .social-login {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 20px;

    & img {
      cursor: pointer;
    }
  }

  @media (max-width: 770px) {
    .cover-img {
      display: none;
    }
  }
`;

