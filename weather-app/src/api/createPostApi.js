import axios from 'axios';

const BASE_URL = 'https://example-api.com';

export const createPost = async (content) => {
	try {
		const response = await axios.post(`${BASE_URL}/posts`, {
			content,
		});

		return response.data;
	} catch (error) {
		// error.response 를 통해 서버 응답에 접근할 수 있습니다.
		// error.message 를 사용하여 오류 메시지에 접근할 수 있습니다.
		throw new Error(
			error.response ? error.response.data : 'Failed to create post'
		);
	}
};
