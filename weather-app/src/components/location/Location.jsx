import React, { useState, useEffect } from 'react';
import axios from 'axios';

<<<<<<< HEAD
const WeatherInfo = () => {
	const [weatherData, setWeatherData] = useState({
		locationName: '',
		currentTemp: null,
		weatherDescription: '',
		minTemp: null,
		maxTemp: null,
		precipitation: null,
		uvIndex: null,
	});
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY = 'dcd4cc7754eeecc0a0b7ba1260ac6f25';
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';
	const ONE_CALL_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/onecall';
=======
const LocationInfo = ({ onLocationUpdate }) => {
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const OPEN_WEATHER_MAP_API_KEY = 'd1aaa3d185e5c01495cec131c6f5c82c';
	const WEATHER_API_ENDPOINT =
		'https://api.openweathermap.org/data/2.5/weather';
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d

	const getCurrentLocation = () => {
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

<<<<<<< HEAD
	const fetchWeatherData = async (lat, lon) => {
=======
	const fetchLocationName = async (lat, lon) => {
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d
		setIsLoading(true);
		try {
			const response = await axios.get(WEATHER_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					appid: OPEN_WEATHER_MAP_API_KEY,
<<<<<<< HEAD
					units: 'metric',
					lang: 'kr',
=======
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d
				},
			});

			const locationName = response.data.name;
<<<<<<< HEAD
			const currentTemp = response.data.main.temp;
			const weatherDescription = response.data.weather[0].description;

			const oneCallResponse = await axios.get(ONE_CALL_API_ENDPOINT, {
				params: {
					lat: lat,
					lon: lon,
					exclude: 'current,minutely,hourly,alerts',
					appid: OPEN_WEATHER_MAP_API_KEY,
					units: 'metric',
					lang: 'kr',
				},
			});

			const dailyData = oneCallResponse.data.daily[0];

			setWeatherData({
				locationName,
				currentTemp,
				weatherDescription,
				minTemp: dailyData.temp.min,
				maxTemp: dailyData.temp.max,
				precipitation: dailyData.rain ? dailyData.rain['1h'] : 0,
				uvIndex: dailyData.uvi,
			});
		} catch (error) {
			console.error('Error fetching weather data:', error);
=======
			setLocation(locationName);

			// 부모 컴포넌트에 위치 정보 업데이트
			if (onLocationUpdate) {
				onLocationUpdate(locationName);
			}
		} catch (error) {
			console.error('Error fetching location name:', error);
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
<<<<<<< HEAD
		const loadWeatherData = async () => {
			try {
				const { lat, lon } = await getCurrentLocation();
				await fetchWeatherData(lat, lon);
=======
		const loadLocationData = async () => {
			try {
				const { lat, lon } = await getCurrentLocation();
				await fetchLocationName(lat, lon);
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d
			} catch (error) {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

<<<<<<< HEAD
		loadWeatherData();
	}, []);

	if (isLoading) {
		return <div>날씨 데이터를 불러오는 중입니다...</div>;
	}

	return (
		<div>{weatherData.locationName && <p>{weatherData.locationName}</p>}</div>
	);
};

export default WeatherInfo;
=======
		loadLocationData();
	}, []);

	if (isLoading) {
		return <div>위치 정보를 불러오는 중입니다...</div>;
	}

	return <div>{location && <p>{location}</p>}</div>;
};

export default LocationInfo;
>>>>>>> ff5c887a2e467301253c0f1a62649f665450fe2d
