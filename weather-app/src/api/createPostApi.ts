import axiosClient from './axiosClient';

const createPostApi = async (
	content: string,
	temperature: string | undefined, // 기본값 설정
	location: string | undefined, // 기본값 설정
	mediaFiles: File[],
	hashtags: string,
	access_token: string
): Promise<any> => {
	const formData = new FormData();
	formData.append('content', content);

	if (temperature) formData.append('temperature', temperature);
	if (location) formData.append('location', location);

	mediaFiles.forEach((file) => {
		if (file) {
			formData.append('mediaFiles', file);
		}
	});

	if (hashtags && typeof hashtags === 'string') {
		// 해시태그를 정규 표현식을 사용하여 추출
		const hashtagsArray = hashtags.match(/#[\p{L}]+/gu);
		if (hashtagsArray) {
			// 각 해시태그에서 '#'을 제거하고 공백으로 구분된 하나의 문자열로 합침
			const hashtagsStr = hashtagsArray.map((tag) => tag.slice(1));

			// 배열의 각 요소를 formData에 개별적으로 추가
			hashtagsStr.forEach((tag) => {
				formData.append('hashtags', tag);
			});
		}
	}

	try {
		const response = await axiosClient.post(`/post`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error in createPostAPI:', error);
		throw error;
	}
};

export default createPostApi;
