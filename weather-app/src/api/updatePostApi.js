const BASE_URL =
	'http://ec2-43-200-188-52.ap-northeast-2.compute.amazonaws.com:8080';

export const updatePost = async (id, content) => {
	try {
		const response = await fetch(`${BASE_URL}/posts/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
