import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const updatePost = async (
	content: string,
	temperature: string,
	location: string,
	postId: string,
	mediaFiles: (File | string)[],
	hashtags: string,
	access_token: string
): Promise<any> => {
	const formData = new FormData();

	formData.append('content', content);
	formData.append('location', location);
	formData.append('temperature', temperature);

	if (hashtags) {
		const hashtagsArray = hashtags.match(/#[\p{L}]+/gu);
		if (hashtagsArray) {
			const hashtagsStr = hashtagsArray.map((tag) => tag.slice(1)).join(' ');
			formData.append('hashtags', hashtagsStr);
		}
	}

	mediaFiles.forEach((file) => {
		if (file instanceof File) {
			formData.append('newPostImages', file);
		} else if (typeof file === 'string') {
			formData.append('originalImages', file);
		}
	});

	try {
		const token = localStorage.getItem('access_token');
		const response = await axios.put(`${BASE_URL}/post/${postId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: ` ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error in updatePost:', error);
		throw error;
	}
};

export default updatePost;
