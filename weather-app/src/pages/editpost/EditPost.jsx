import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopWrap from '../newpost/TopWrap';
import ImageWrap from '../newpost/ImageWrap';
import ContentWrap from '../newpost/ContentWrap';
import ButtonWrap from '../newpost/ButtonWrap';
import Modal from '../newpost/Modal';
import { fetchPost } from '../../api/fetchPostApi';
import { updatePost } from '../../api/updatePostApi';
import { deletePost } from '../../api/deletePostApi';

const EditPost = () => {
	const { postId } = useParams(); // 게시물 ID를 가져옵니다.
	const navigate = useNavigate();

	// 상태 변수들
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [content, setContent] = useState('');
	const [files, setFiles] = useState([]); // 이미지 파일들
	const [hashtags, setHashtags] = useState('');
	const [temperature, setTemperature] = useState(''); // 온도
	const [location, setLocation] = useState(''); // 위치

	useEffect(() => {
		const loadPost = async () => {
			try {
				// URL 경로의 파라미터로부터 postId를 가져옵니다.
				const postData = await fetchPost(postId);
				setContent(postData.content);
				setFiles(postData.files);
				setHashtags(postData.hashtags);
				setTemperature(postData.temperature);
				setLocation(postData.location);
			} catch (error) {
				console.error('Failed to fetch post:', error);
			}
		};

		loadPost();
	}, [postId]);

	const handleContentChange = (e) => setContent(e.target.value);
	const handleHashtagsChange = (e) => setHashtags(e.target.value);
	const handleFilesChange = (newFiles) => setFiles(newFiles);
	const handleLocationChange = (newLocation) => setLocation(newLocation);
	const handleWeatherUpdate = (newTemperature) =>
		setTemperature(newTemperature);

	const handleSave = () => setShowModal(true);
	const handleCancelSave = () => setShowModal(false);
	const handleDelete = () => setShowDeleteModal(true);

	const handleConfirmSave = async () => {
		try {
			const token = localStorage.getItem('access_token');
			await updatePost(
				postId,
				{
					content,
					temperature,
					location,
					files,
					hashtags,
				},
				token
			); // token을 별도의 매개변수로 전달
			setShowModal(false);
			navigate('/feed');
		} catch (error) {
			console.error('Failed to update post:', error);
		}
	};

	const handleConfirmDelete = async () => {
		try {
			await deletePost(postId);
			setShowDeleteModal(false);
			navigate('/feed');
		} catch (error) {
			console.error('Failed to delete post:', error);
		}
	};

	const handleCancel = () => {
		setShowModal(false);
		setShowDeleteModal(false);
	};

	return (
		<Container>
			<TopWrap
				onLocationUpdate={handleLocationChange}
				onTemperatureChange={handleWeatherUpdate}
			/>
			<ImageWrap onFilesChange={handleFilesChange} />
			<ContentWrap
				content={content}
				onContentChange={handleContentChange}
				onHashtagsChange={handleHashtagsChange}
			/>
			<ButtonWrap
				onSave={handleSave}
				onDelete={handleDelete}
				onCancel={handleCancel}
			/>

			{showDeleteModal && (
				<Modal
					message="삭제하시겠습니까?"
					onConfirm={handleConfirmDelete}
					onCancel={handleCancel}
				/>
			)}

			{showModal && (
				<Modal
					message="수정을 저장하시겠습니까?"
					onConfirm={handleConfirmSave}
					onCancel={handleCancelSave}
				/>
			)}
		</Container>
	);
};

export default EditPost;

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
