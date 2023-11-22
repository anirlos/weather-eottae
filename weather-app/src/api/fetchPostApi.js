import axios from 'axios';

const BASE_URL =
	'http://ec2-43-200-188-52.ap-northeast-2.compute.amazonaws.com:8080';

export const fetchPost = async (id, queryParams) => {
	try {
		const response = await axios.get(`${BASE_URL}/posts/${id}`, {
			params: queryParams,
		});
		return response.data; // 게시물 데이터 반환
	} catch (error) {
		console.error('Error fetching post:', error);
		throw error; // 오류를 호출자에게 전파
	}
};
