import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LocationInfoProps {
	onLocationUpdate?: (locationName: string) => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ onLocationUpdate }) => {
	const [location, setLocation] = useState(''); // 타입 정의 제거
	const [isLoading, setIsLoading] = useState(true);

	const fetchLocationName = async (lat: number, lon: number) => {
		const weatherApiEndpoint =
			'https://api.openweathermap.org/data/2.5/weather';

		setIsLoading(true);
		try {
			const response = await axios.get(weatherApiEndpoint, {
				params: {
					lat,
					lon,
					appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
				},
			});
			const locationName = response.data.name;
			setLocation(locationName);
			if (onLocationUpdate) {
				onLocationUpdate(locationName);
			}
		} catch (error) {
			console.error('Error fetching location name:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const getCurrentLocation = (): Promise<GeolocationCoordinates> => {
			return new Promise((resolve, reject) => {
				if (!navigator.geolocation) {
					reject(new Error('Geolocation is not supported by this browser.'));
					return;
				}
				navigator.geolocation.getCurrentPosition(
					(position) => resolve(position.coords),
					(error) => reject(error),
					{ enableHighAccuracy: true }
				);
			});
		};

		const loadLocationData = async () => {
			try {
				const { latitude: lat, longitude: lon } = await getCurrentLocation();
				await fetchLocationName(lat, lon);
			} catch (error) {
				console.error('Error getting user location:', error);
				setIsLoading(false);
			}
		};

		loadLocationData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <div>위치 정보를 불러오는 중입니다...</div>;
	}

	return <div>{location && <p>{location}</p>}</div>;
};

export default LocationInfo;
