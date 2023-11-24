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
	const [hashtags, setHashtags] = useState([]); // 해시태그들
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('token');
	};

	const handleContentChange = (newContent) => {
		setContent(newContent);

		// 해시태그 추출 로직
		const extractedHashtags = newContent.match(/#[\p{L}]+/gu) || [];
		setHashtags(extractedHashtags);
	};

	const handleFilesChange = (newFiles) => {
		setFiles(newFiles);
	};

	const handleSave = () => {
		setShowModal(true);
	};

	const handleConfirmSave = async () => {
		try {
			const token = getTokenFromLocalStorage();
			await createPostAPI(content, files, hashtags, token);
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
				<TopWrap />
				<ImageWrap onFilesChange={handleFilesChange} />
				<ContentWrap content={content} onContentChange={handleContentChange} />
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
