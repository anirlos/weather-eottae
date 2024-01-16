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
const fetchPostApi = async (postId: string): Promise<PostData | null> => {
	try {
		const response = await axiosClient.get<PostData>(`/post/${postId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching post data:', error);
		return null; // 오류가 발생했을 때 null 반환
	}
};

export default fetchPostApi;
