import axios from 'axios';

const BASE_URL =
	'http://ec2-43-200-188-52.ap-northeast-2.compute.amazonaws.com:8080';

export const createPost = async ({
	content,
	accountNonExpired,
	accountNonLocked,
	authorities,
	credentialsNonExpired,
	enabled,
	hashtags,
	location,
	mediaFiles,
	password,
	temperature,
	username,
}) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/post`, {
			content,
			accountNonExpired,
			accountNonLocked,
			authorities,
			credentialsNonExpired,
			enabled,
			hashtags,
			location,
			mediaFiles,
			password,
			temperature,
			username,
		});

		return response.data;
	} catch (error) {
		console.error('Error object:', error); // 오류 객체 출력
		throw new Error(
			error.response ? error.response.data : 'Failed to create post'
		);
	}
};
