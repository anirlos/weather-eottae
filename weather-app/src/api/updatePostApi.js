const BASE_URL = 'http://43.200.188.52:8080';

export const updatePost = async (postId, postData, token) => {
	try {
		const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
			method: 'put', // PUT 메서드로 변경
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ postData }), // 업데이트할 내용을 JSON 형식으로 변환
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json(); // 업데이트 후의 응답 반환
	} catch (error) {
		console.error('Error:', error);
		throw error; // 오류를 상위 컴포넌트나 호출자에게 전파
	}
};
