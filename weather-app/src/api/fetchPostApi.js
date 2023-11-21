import axios from 'axios';

const BASE_URL = 'https://5999418e-c835-43c7-9c6d-60fdb423183f.mock.pstmn.io';

export const fetchPost = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/posts/${id}`);
		return response.data; // 게시물 데이터 반환
	} catch (error) {
		console.error('Error fetching post:', error);
		throw error; // 오류를 호출자에게 전파
	}
};
