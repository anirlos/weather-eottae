import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

export const fetchPost = async (postId) => {
	try {
		const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
		return response.data; // 사용자의 게시물 데이터 반환
	} catch (error) {
		console.error('Error fetching posts by user:', error);
		throw error; // 오류를 호출자에게 전파
	}
};
