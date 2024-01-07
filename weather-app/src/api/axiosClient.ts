import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response.headers['Authorization']) {
			let access_Token = response.headers['Authorization'];

			localStorage.setItem('access_Token', access_Token);
		}
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_Token');

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
