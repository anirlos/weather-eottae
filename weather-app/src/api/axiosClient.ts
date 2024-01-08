import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
	baseURL: 'http://43.202.97.83:8080/api',
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response.headers['Authorization']) {
			let access_token = response.headers['Authorization'];

			localStorage.setItem('access_token', access_token);
		}
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');

		if (token) {
			config.headers['Authorization'] = `${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosClient;
