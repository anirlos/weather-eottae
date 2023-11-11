import React ,{useState}from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import login from '../../assets/img/login/login.png'
import devicon_google from '../../assets/img/login/devicon_google.png';
import kakao from '../../assets/img/login/kakao.png';



const Login = () => {
    const [userId,setUserId]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`id : ${userId}, password: ${password}`);
        //서버에 요청. 여기에도 토큰을 담아서 요청? 서버에서 언제 토큰을 받고 또 로컬스토리지.셋아이템() 언제 어디에? 쓰는지?
    }

    return (
        <Container>
        
            <div className='cover-img'>
                <img src={login} alt="login" height={'100%'}/>
            </div>
           
                <div className='loginPage'> 
                <h1>로그인</h1>
               <p>오늘도 좋은 날이에요</p>
               <div className='form'>
                <form onSubmit={handleSubmit}>
                <input type="text" value={userId} name='id' id='' placeholder='아이디' onChange={(e)=>setUserId(e.target.value)}/>
                <input type="password" value={password} name='password' id='' placeholder='비밀번호' onChange={(e)=>setPassword(e.target.value)}/>
                <input type="checkbox" id="checkbox"/>로그인 정보 기억하기
                <button>로그인</button>
               </form>
               </div>
               <div>
              <p>비밀번호를 잊으셨나요?</p>
               <hr className='line'/>
               <p>Or</p>
               <hr className='line'/></div>
               
               <div className='social-login'>
                <img src={devicon_google} alt="google"/>
                <img src={kakao} alt="kakao"/>
               </div>
               <h6>아이디가 없으신가요? <Link to="/signup">회원가입하기</Link></h6></div>
              
           
       
        </Container>
    );
};

export default Login;

const Container = styled.div`
	display: flex;
	width: 100%;
	max-width: 1440px;
	margin: 0 auto;

.loginPage {
    display:flex;
    flex-direction:column;
    align-item:center;
    background-color: #505EA3;
    color: white;
    
}

form{
    display:flex;
    flex-direction:column;
    background-color:grey;
    align-item:center;
}



`;
