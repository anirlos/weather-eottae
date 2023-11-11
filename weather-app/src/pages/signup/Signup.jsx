import React ,{useState} from 'react';
//여러가지 유효성 검사, 비번확인, 미디어파일전송
const Signup = () => {
    const [userName,setUserName]=useState('');
    const [userId,setUserId]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [verifidePassword,setVerifidePassword]=useState('');
    const [address,setAddress]=useState('');
    const [message,setMessage]=useState('');
    const [file,setFile]=useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`id : ${userId}, password: ${password}`);
    }

    return (
        <div>
        <div className='wrapper'>
            <div className='cover-img'>
                <img></img>
            </div>
            <div className='login-page'>
               <h1>회원가입</h1>
               <form onSubmit={handleSubmit}>
                <label htmlFor='userName'>이름</label>
                <input type="text" value={userName} name='userName' id='' onChange={(e)=>setUserName(e.target.value)}/>
                <label htmlFor='userId'>아이디</label>
                <input type="text" value={userId} name='userId' id='' onChange={(e)=>setUserId(e.target.value)}/>
                <label htmlFor='email'>email</label>
                <input type="text" value={email} name='email' id='' onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor='password'>비밀번호</label>
                <input type="password" value={password} name='password' id='' onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor='verifidePassword'>비밀번호 확인</label>
                <input type="password" value={verifidePassword} name='verifidePassword' id='' onChange={(e)=>setVerifidePassword(e.target.value)}/>
                <label htmlFor='address'>주소 입력</label>
                <input type="text" value={address} name='address' id='' onChange={(e)=>setAddress(e.target.value)}/>
                <label htmlFor='message'>회원들에게 보일 인삿말과 프로필사진을 등록해보세요</label>
                <input type='text' value={message} name='message' id='' onChange={(e)=>setMessage(e.target.value)}></input>
                <input type='file' value={file} name='file' id='' onChange={(e)=>setFile(e.target.value)}></input>
                <button>회원가입</button>
               </form>
               <hr className='line'/>
               <p>Or</p>
               <hr className='line'/>
               <div className='social-login'>
                <img></img>
                <img></img>
               </div>
            </div>
        </div>
        </div>
        
    );
};

export default Signup;