import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

const createPostAPI = async (content, files, token, postId) => {
	const formData = new FormData();
	formData.append('content', content);
	files.forEach((file) => formData.append('files', file));

	if (postId) {
		formData.append('postId', postId);
	}

	try {
		const response = await axios.post(`${BASE_URL}/api/post`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export default createPostAPI;
