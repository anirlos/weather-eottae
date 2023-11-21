const BASE_URL = 'https://example-api.com'; // 실제 API 서버 주소로 변경

export const deletePost = async (id) => {
	const response = await fetch(`${BASE_URL}/posts/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error('Failed to delete post');
	}
	return response.json();
};