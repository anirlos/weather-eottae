import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopWrap from '../newpost/TopWrap';
import ImageWrap from '../newpost/ImageWrap';
import ContentWrap from '../newpost/ContentWrap';
import ButtonWrap from '../newpost/ButtonWrap';
import Modal from '../newpost/Modal';
import fetchPost from '../../api/fetchPostApi';
import { updatePost } from '../../api/updatePostApi';
import { deletePost } from '../../api/deletePostApi';

const EditPost = () => {
	const { postId } = useParams(); // 게시물 ID를 가져옵니다.
	const navigate = useNavigate();

	// 상태 변수들
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [content, setContent] = useState('');
	const [temperature, setTemperature] = useState(''); // 온도
	const [location, setLocation] = useState(''); // 위치
	const [mediaFiles, setMediaFiles] = useState([]);
	const [hashtags, setHashtags] = useState('');
	const [date, setDate] = useState(''); // 날짜

	useEffect(() => {
		const loadPost = async () => {
			try {
				// postId를 사용하여 게시물 정보를 가져옵니다.
				const postData = await fetchPost(postId);

				// 게시물 정보를 상태 변수에 설정합니다.
				setContent(postData.content);
				setHashtags(postData.hashtagNames.join('#')); // 해시태그를 공백으로 구분하여 문자열로 설정
				setTemperature(postData.temperature || ''); // 온도
				setLocation(postData.location || ''); // 위치
				setDate(postData.date || ''); // 날짜 설정

				// 이미지 파일 URL을 mediaFiles 상태 변수에 설정합니다.
				const mediaUrls = postData.mediaUrls || [];
				setMediaFiles(mediaUrls);
			} catch (error) {
				console.error('Failed to fetch post:', error);
			}
		};
		loadPost();
	}, [postId]);

	const handleContentChange = (e) => setContent(e.target.value);
	const handleHashtagsChange = (e) => setHashtags(e.target.value);

	const handleSave = () => setShowModal(true);
	const handleCancelSave = () => setShowModal(false);
	const handleDelete = () => setShowDeleteModal(true);

	const handleConfirmSave = async () => {
		try {
			const token = localStorage.getItem('access_token');
			const safeFiles = mediaFiles || [];
			await updatePost(
				postId,
				{
					content,
					temperature,
					location,
					mediaFiles: safeFiles, // 파일 업로드 관련 수정
					hashtags,
					date,
				},
				token
			);
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

	const handleImageRemove = (index) => {
		const updatedMediaFiles = [...mediaFiles];
		updatedMediaFiles.splice(index, 1);
		setMediaFiles(updatedMediaFiles);
	};

	return (
		<Container>
			<TopWrap />
			<ImageWrap
				initialFiles={mediaFiles}
				mediaFiles={setMediaFiles}
				onFilesChange={(newFiles) => setMediaFiles(newFiles)}
			/>
			{/* 이미지 미리보기 */}
			<ImagePreviewContainer>
				{mediaFiles.map((imageUrl, index) => (
					<ImagePreviewWrapper key={index}>
						<img src={imageUrl} alt={`Image ${index + 1}`} />
						<RemoveImageButton onClick={() => handleImageRemove(index)}>
							Remove
						</RemoveImageButton>
					</ImagePreviewWrapper>
				))}
			</ImagePreviewContainer>
			<ContentWrap
				content={content}
				hashtags={hashtags}
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
const ImagePreviewContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 20px;
`;

const ImagePreviewWrapper = styled.div`
	position: relative;
	margin-bottom: 10px;
	margin-right: 10px;
	width: 600px;
	height: 40vh;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

const RemoveImageButton = styled.button`
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: #ff0000;
	color: #fff;
	border: none;
	border-radius: 50%;
	padding: 5px;
	cursor: pointer;
`;
