import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createPostAPI = async (
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

	if (hashtags) {
		const hashtagsArray = hashtags.match(/#[\p{L}]+/gu);
		if (hashtagsArray) {
			const hashtagsStr = hashtagsArray.map((tag) => tag.slice(1)).join(' ');
			formData.append('hashtags', hashtagsStr);
		}
	}

	try {
		const response = await axios.post(`${BASE_URL}/post`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: ` ${access_token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error in createPostAPI:', error);
		throw error;
	}
};

export default createPostAPI;
