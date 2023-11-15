const BASE_URL = 'https://example.com';

export const fetchPost = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/posts/${id}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
