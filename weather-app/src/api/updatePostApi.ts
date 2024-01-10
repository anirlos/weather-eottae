import axiosClient from './axiosClient';

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
		// 해시태그를 공백으로 분리하고 formData에 추가
		hashtags.split(' ').forEach((tag) => {
			if (tag.startsWith('#')) {
				formData.append('hashtags', tag.slice(1)); // '#' 제거
			} else {
				formData.append('hashtags', tag);
			}
		});
	}

	mediaFiles.forEach((file) => {
		if (file instanceof File) {
			formData.append('newPostImages', file);
		} else if (typeof file === 'string') {
			formData.append('originalImages', file);
		}
	});

	try {
		const response = await axiosClient.put(`/post/${postId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${access_token}`, // Correctly reference access_token
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error in updatePost:', error);
		if (error instanceof Error) {
			throw new Error(`Error in updating post: ${error.message}`);
		} else {
			throw new Error('Error in updating post');
		}
	}
};

export default updatePost;
