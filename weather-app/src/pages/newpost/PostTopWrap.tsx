// PostTopWrap.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';
import LocationInfo from '../../components/location/Location';
import WeatherInfo from '../../components/weather/Weather';
import {
	Wrap,
	Top,
	BackButton,
	Title,
	Bottom,
	Place,
	DateInfo,
} from './PostTopWrapStyles';

interface PostTopWrapProps {
	onTemperatureChange: (temperature: number) => void;
	onLocationUpdate: (location: string) => void;
}

const PostTopWrap: React.FC<PostTopWrapProps> = ({
	onTemperatureChange,
	onLocationUpdate,
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	const handleWeatherUpdate = (temperature: number | null) => {
		onTemperatureChange(temperature !== null ? temperature : -999);
	};

	const handleLocationUpdate = (location: string) => {
		onLocationUpdate(location);
	};

	const date = new Date();
	const currentDateAndTime = `${date.getFullYear()}-${String(
		date.getMonth() + 1
	).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
		date.getHours()
	).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

	return (
		<Wrap>
			<Top>
				<BackButton onClick={handleBack}>
					<HiArrowLeft />
				</BackButton>
				<Title>새 게시물</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<LocationInfo onLocationUpdate={handleLocationUpdate} />
					&nbsp;
					<WeatherInfo onWeatherUpdate={handleWeatherUpdate} />
				</Place>
				<DateInfo>
					<span>{currentDateAndTime}</span>
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default PostTopWrap;
