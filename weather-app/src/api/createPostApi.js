import axios from 'axios';

const BASE_URL = 'http://43.200.188.52:8080';

const createPostAPI = async (
	content,
	temperature,
	location,
	mediaFiles,
	hashtags
) => {
	const formData = new FormData();
	formData.append('content', content);
	formData.append('temperature', temperature); // 온도 데이터 추가
	formData.append('location', location); // 위치 데이터 추가

	mediaFiles.forEach((file) => formData.append('mediaFiles', file)); // mediaFiles 배열 처리

	// 해시태그가 있는 경우 JSON 문자열로 변환하여 추가
	if (hashtags && hashtags.length > 0) {
		formData.append('hashtags', JSON.stringify(hashtags));
	}

	try {
		const response = await axios.post(`${BASE_URL}/api/post`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				// 실제 애플리케이션에서는 토큰을 안전하게 관리해야 합니다.
				Authorization: `Bearer your_access_token`,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export default createPostAPI;
