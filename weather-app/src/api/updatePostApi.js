const BASE_URL = 'https://example.com';

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
