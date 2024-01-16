import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherInfoProps {
	onWeatherUpdate?: (temperature: number | null) => void;
}

interface WeatherData {
	temperature: number | null;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ onWeatherUpdate }) => {
	const [weatherData, setWeatherData] = useState<WeatherData>({
		temperature: null,
	});
	const [isLoading, setIsLoading] = useState(true);

	const openWeatherMapApiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
	const weatherApiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

	useEffect(() => {
		const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
			return new Promise((resolve, reject) => {
				if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							resolve({
								lat: position.coords.latitude,
								lon: position.coords.longitude,
							});
						},
						(error) => {
							reject(error);
						}
					);
				} else {
					reject(new Error('Geolocation is not supported by this browser.'));
				}
			});
		};

		const fetchWeatherData = async (lat: number, lon: number) => {
			setIsLoading(true);
			try {
				const response = await axios.get(weatherApiEndpoint, {
					params: {
						lat: lat,
						lon: lon,
						appid: openWeatherMapApiKey,
						units: 'metric',
					},
				});

				// 온도 값을 반올림하여 정수로 변환
				const temperature = Math.round(response.data.main.temp);
				setWeatherData({ temperature });
				if (onWeatherUpdate) {
					onWeatherUpdate(temperature);
				}
			} catch (error) {
				console.error('Error fetching weather data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getCurrentLocation()
			.then(({ lat, lon }) => {
				fetchWeatherData(lat, lon);
			})
			.catch((error) => {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <div>날씨 데이터를 불러오는 중입니다...</div>;
	}

	return (
		<div>
			<p>
				{weatherData.temperature !== null
					? `${weatherData.temperature}°C`
					: 'N/A'}
			</p>
		</div>
	);
};

export default WeatherInfo;
