import axios, { isAxiosError } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; // 실제 API 서버 주소

export const deletePost = async (postId: string): Promise<any> => {
	const token = localStorage.getItem('access_token');

	try {
		const response = await axios.delete(`${BASE_URL}/post/${postId}`, {
			headers: {
				Authorization: ` ${token}`, // 인증 토큰을 헤더에 추가
			},
		});

		return response.data; // axios는 자동으로 응답 본문을 반환합니다.
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			if (error.response) {
				console.error('Error response:', error.response);
				throw new Error('Failed to delete post');
			} else if (error.request) {
				console.error('Error request:', error.request);
				throw new Error('No response received');
			}
		} else {
			console.error('Error:', error);
			throw new Error('Error in request');
		}
	}
};
