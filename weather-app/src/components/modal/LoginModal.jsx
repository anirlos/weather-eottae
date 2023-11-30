import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginModal = () => {
    return (
        <div>
          <Backdrop />
          <Card className="modal">
            <header className="header"></header>
            <div className="content">
              <p>로그인이 필요한 서비스입니다.</p>
            </div>
            <footer className="actions">
              <Link to="/login">
                <Button>로그인</Button>
              </Link>
            </footer>
          </Card>
        </div>
      );
    };

export default LoginModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;



const Card = styled.div`
background: white;
border-radius: 10px;


&.modal {
  position: fixed;
  top: 30vh;
  left: 25%;
  width: 50%;
  z-index: 100;
  overflow: hidden;
}

.header {
  background: #505EA3;
  padding: 1rem;
}

.header h2 {
  margin: 0;
  color: white;
}

.content {
  padding: 1rem;
}

.actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}
`;

const Button = styled.div`
margin-top: 10px;
background-color: white;
color: black;
width: 110px;
height: 22px;
border: 0.5px solid black;
border-radius: 5px;
font-size: 15px;
text-align:center;
&:hover {
  color: white;
  background-color: grey;
  transition: 0.2s;

`