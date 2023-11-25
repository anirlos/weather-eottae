import React from 'react';
import axios from 'axios';

const Logout = () => {
    const onLogOut = async () =>{
    try{
        const response=await axios.get('http://43.200.188.52:8080/login')
        
        const accessToken = response.headers['authorization_access_token'];
		const refreshToken = response.headers['authorization_refresh_token'];
        if (accessToken&&refreshToken) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
        else{
            console.log("토큰이 존재하지 않습니다.")
        }
      
    }
    catch(e){
        console.log("로그아웃 실패:", e)
    }}
        



    
    return (
        <div>
            
        </div>
    );
};

export default Logout;