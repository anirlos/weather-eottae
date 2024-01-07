import axios from 'axios';

// 서버의 기본 URL 설정
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 서버로부터 받는 게시물 데이터의 타입을 정의합니다.
interface PostData {
	temperature: string;
	location: string;
	date: string;
	mediaUrls: string[];
	content: string;
	hashtagNames: string[];
}

// postId를 인자로 받아 해당 게시물의 데이터를 불러오는 함수를 정의합니다.
export const fetchPost = async (postId: string): Promise<PostData> => {
	try {
		// 로컬 스토리지에서 사용자 토큰을 가져옵니다.
		const token = localStorage.getItem('access_token');

		// Axios를 사용하여 서버에 GET 요청을 보냅니다.
		const response = await axios.get<PostData>(`${BASE_URL}/post/${postId}`, {
			headers: {
				Authorization: ` ${token}`, // Bearer 토큰을 헤더에 추가
			},
		});

		return response.data;
	} catch (error: unknown) {
		console.error('Error in fetchPost:', error);
		throw new Error('Failed to fetch post data');
	}
};

export default fetchPost;
