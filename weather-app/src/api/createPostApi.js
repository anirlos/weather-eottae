import axios from 'axios';

const BASE_URL = 'https://5999418e-c835-43c7-9c6d-60fdb423183f.mock.pstmn.io';

export const createPost = async (content) => {
	try {
		const response = await axios.post(`${BASE_URL}/posts`, {
			content,
		});

		return response.data;
	} catch (error) {
		console.error('Error object:', error); // 오류 객체 출력
		throw new Error(
			error.response ? error.response.data : 'Failed to create post'
		);
	}
};
