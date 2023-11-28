import React, { useState, useEffect } from 'react';

const LocationComponent = ({ onLocationUpdate }) => {
	const [location, setLocation] = useState({
		loaded: false,
		coordinates: { lat: '', lng: '' },
		state: '',
	});

	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Google Maps API 키

	const getState = async (latitude, longitude) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
			);
			const data = await response.json();

			// "시/도" 정보 추출
			const addressComponents = data.results[1].address_components;
			let state = '';

			for (const component of addressComponents) {
				if (component.types.includes('administrative_area_level_1')) {
					state = component.long_name;
				}
			}

			return state;
		} catch (error) {
			console.error('Error fetching state:', error);
			return 'error';
		}
	};

	const onSuccess = async (position) => {
		const { latitude, longitude } = position.coords;
		const state = await getState(latitude, longitude);

		setLocation({
			loaded: true,
			coordinates: {
				lat: latitude,
				lng: longitude,
			},
			state: state || '없음',
		});
		if (onLocationUpdate) {
			onLocationUpdate(state || '없음');
		}
	};

	const onError = (error) => {
		setLocation({
			loaded: true,
			error,
		});
		if (onLocationUpdate) {
			onLocationUpdate('없음'); // 또는 적절한 기본값
		}
	};

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 0,
				message: 'Geolocation not supported',
			});
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}, []);

	return (
		<div>
			{location.loaded ? (
				<div>
					<p>{location.state}</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default LocationComponent;
