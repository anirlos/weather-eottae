const BASE_URL =
	'http://ec2-43-200-188-52.ap-northeast-2.compute.amazonaws.com:8080'; // 실제 API 서버 주소로 변경

export const deletePost = async (id) => {
	const response = await fetch(`${BASE_URL}/posts/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error('Failed to delete post');
	}
	return response.json();
};
