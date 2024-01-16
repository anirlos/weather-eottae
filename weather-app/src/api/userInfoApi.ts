import axiosClient from './axiosClient';

interface Post {
	postId: number;
	mediaUrls: string[];
	userId: number;
}

interface PostData {
	postResponseDtos: Post[];
}

interface ImageData {
	mediaUrl: string;
	postId: number;
	userId: number;
}

interface UserInfoData {
	nickName: string;
	email: string;
	address: string;
	message: string;
}

const userInfoApi = {
	deleteUser: async () => {
		try {
			const response = await axiosClient.delete('/user');
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	fetchUserNickName: async (): Promise<string> => {
		try {
			const response = await axiosClient.get('/user');
			return response.data.nickName;
		} catch (error) {
			throw error;
		}
	},

	fetchUserPosts: async (nickName: string): Promise<ImageData[]> => {
		try {
			const response = await axiosClient.get<PostData>(
				`/posts/user/${nickName}`
			);
			return response.data.postResponseDtos.map(
				(post: Post): ImageData => ({
					mediaUrl: post.mediaUrls[0],
					postId: post.postId,
					userId: post.userId,
				})
			);
		} catch (error) {
			throw error;
		}
	},

	fetchUserInfo: async () => {
		try {
			const token = localStorage.getItem('access_token');
			const response = await axiosClient.get('/user', {
				headers: {
					Authorization: `${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},

	updateUserInfo: async (
		userInfoData: UserInfoData,
		uploadedImage: File | null
	) => {
		try {
			const token = localStorage.getItem('access_token');
			if (!token) throw new Error('Access token not found');

			const formData = new FormData();

			// 회원 정보를 JSON Blob으로 변환하여 formData에 추가
			const { nickName, email, address, message } = userInfoData;

			formData.append(
				'request',
				new Blob(
					[
						JSON.stringify({
							nickName,
							email,
							address,
							message,
						}),
					],
					{
						type: 'application/json',
					}
				)
			);

			// 이미지 파일 데이터 추가
			if (uploadedImage) {
				formData.append('file', uploadedImage, uploadedImage.name);
			}

			// Axios 요청
			const response = await axiosClient.patch('/user', formData, {
				headers: {
					Authorization: `${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			const newAccessToken = response.headers['Authorization_Access_Token'];
			const newRefreshToken = response.headers['Authorization_Refresh_Token'];

			if (newAccessToken) {
				localStorage.setItem('access_token', newAccessToken);
			}

			if (newRefreshToken) {
				localStorage.setItem('refresh_token', newRefreshToken);
			}

			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default userInfoApi;
