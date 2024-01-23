import { loginSuccess } from '../slice/authSlice';
import axios from 'axios';

export function authActionCreator(userId, password) {
	return async function authThunk(dispatch, getState) {
		try {
			const response = await axios.post('http://43.202.97.83:8080/login', {
				email: userId,
				password: password,
			});

			const accessToken = response.headers['authorization_access_token'];
			const refreshToken = response.headers['authorization_refresh_token'];

			dispatch(loginSuccess({ accessToken, refreshToken }));

			if (accessToken && refreshToken) {
				localStorage.setItem('access_token', accessToken);
				localStorage.setItem('refresh_token', refreshToken);
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${accessToken}`;
				console.log('authThunk 통신 성공, 토큰이 담겼습니다.');
				window.location.href = '/';
			} else {
				console.log('토큰이 없습니다.');
			}
		} catch (error) {
			console.error('서버와 통신실패:', error);
		}
	};
}
