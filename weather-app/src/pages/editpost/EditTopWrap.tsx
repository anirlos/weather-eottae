import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';
import {
	Wrap,
	Top,
	BackButton,
	Title,
	Bottom,
	Place,
	DateInfo,
} from './EditTopWrapStyles';

interface EditTopWrapProps {
	temperature: string;
	location: string;
	date: string;
}

const EditTopWrap: React.FC<EditTopWrapProps> = ({
	temperature,
	location,
	date,
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<Wrap>
			<Top>
				<BackButton onClick={handleBack}>
					<HiArrowLeft />
				</BackButton>
				<Title>게시물 수정</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<p>{location}</p>
					&nbsp;
					<p>{temperature}</p>
				</Place>
				<DateInfo>
					<span>{date}</span>
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default EditTopWrap;
