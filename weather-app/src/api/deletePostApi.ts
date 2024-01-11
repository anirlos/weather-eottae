import axios from 'axios';
import axiosClient from './axiosClient';

export const deletePost = async (postId: string): Promise<any> => {
	const token = localStorage.getItem('access_token');
	if (!token) {
		throw new Error('Authentication token not found');
	}

	try {
		const response = await axiosClient.delete(`/post/${postId}`, {
			headers: {
				Authorization: ` ${token}`, // Corrected the format for Authorization header
			},
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.error('Error response:', error.response);
				throw new Error('Failed to delete post');
			} else if (error.request) {
				console.error('Error request:', error.request);
				throw new Error('No response received');
			} else {
				console.error('Error setting up request:', error.message);
				throw new Error('Error in request setup');
			}
		} else {
			console.error('Error:', error);
			throw new Error('Error in request');
		}
	}
};
