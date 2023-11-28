import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../../components/main/MainLayout';
import TopWrap from './TopWrap';
import ImageWrap from './ImageWrap';
import ContentWrap from './ContentWrap';
import ButtonWrap from './ButtonWrap';
import Modal from './Modal';
import createPostAPI from '../../api/createPostApi';

const NewPost = () => {
	const [content, setContent] = useState('');
	const [files, setFiles] = useState([]); // 이미지 파일들

	const [hashtags, setHashtags] = useState('');
	const [temperature, setTemperature] = useState(''); // 온도를 저장할 상태 변수
	const [location, setLocation] = useState(''); // 위치를 저장할 상태 변수

	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('access_token');
	};

	const handleContentChange = (newContent) => {
		setContent(newContent);
	};

	const handleHashtagsChange = (newHashtags) => {
		setHashtags(newHashtags);
	};
	const handleFilesChange = (newFiles) => {
		setFiles(newFiles);
	};

	const handleLocationChange = (location) => {
		setLocation(location); // 위치 상태 업데이트
	};

	const handleWeatherUpdate = (temperature) => {
		setTemperature(temperature);
	};

	const handleSave = () => {
		setShowModal(true); // 모달을 보여줌 (필요한 경우)
	};

	const handleConfirmSave = async () => {
		try {
			const safeFiles = files || [];
			const token = getTokenFromLocalStorage();

			await createPostAPI(
				content, // 분리되지 않은 내용 사용
				temperature,
				location,
				safeFiles,
				hashtags,
				token
			);
			setShowModal(false);
			navigate('/feed');
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	const handleCancelSave = () => {
		setShowModal(false);
	};

	return (
		<Main>
			<Container>
				<TopWrap
					onLocationUpdate={handleLocationChange}
					onTemperatureChange={handleWeatherUpdate}
				/>
				<ImageWrap onFilesChange={handleFilesChange} />
				<ContentWrap
					content={content}
					hashtags={hashtags}
					onContentChange={handleContentChange}
					onHashtagsChange={handleHashtagsChange}
				/>
				<ButtonWrap onSave={handleSave} />
				{showModal && (
					<Modal
						message="저장하시겠습니까?"
						onConfirm={handleConfirmSave}
						onCancel={handleCancelSave}
					/>
				)}
			</Container>
		</Main>
	);
};

export default NewPost;

const Container = styled.div`
	width: 100%;
	height: 100%;
	max-width: 700px;
	margin: 30px auto;
	padding: 30px 0;
	background: #fff;
	border-radius: 10px;
	box-shadow: 2px 4px 10px 0 #dcdbdb;
`;
