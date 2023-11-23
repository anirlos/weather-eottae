import axios from 'axios';

const BASE_URL = 'http://43.200.188.52';

const createPost = async ({
	content,

	location,
	mediaFiles,
}) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/api/post`,
			{
				content,

				location,
				mediaFiles,
			},
			{
				headers: {
					Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDA3MjAyOTAsImV4cCI6MTcwMDcyMzg5MCwic3ViIjoidGVzdEBlbWFpbC5jb20iLCJpZCI6MX0.CDvPEJueJJYL5uXA6aCTb7rozMYGuJpRL6nfust8vSY`, // 동적으로 토큰을 사용
				},
			}
		);
		console.log('Post created:', response.data);
		return response.data;
	} catch (error) {
		console.error('Failed to create post:', error);
		throw new Error(
			error.response ? error.response.data : 'Failed to create post'
		);
	}
};

export default createPost;
