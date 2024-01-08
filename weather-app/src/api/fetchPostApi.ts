import axios from 'axios';
import axiosClient from './axiosClient'; // 첫 번째 코드에서 설정한 axiosClient를 가져옵니다.

// 서버로부터 받는 게시물 데이터의 타입을 정의합니다.
interface PostData {
	temperature: string;
	location: string;
	date: string;
	mediaUrls: string[];
	content: string;
	hashtagNames: string[];
	access_token: string;
}

// postId를 인자로 받아 해당 게시물의 데이터를 불러오는 함수를 정의합니다.
const fetchPostApi = async (postId: string): Promise<PostData> => {
	try {
		const response = await axiosClient.get<PostData>(`/post/${postId}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios-specific error
			console.error('Axios error:', error.response);
		} else {
			// Handle other errors
			console.error('General error:', error);
		}
		throw new Error('Failed to fetch post data');
	}
};

export default fetchPostApi;
