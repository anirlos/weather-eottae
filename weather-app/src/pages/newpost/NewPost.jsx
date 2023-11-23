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
	const [files, setFiles] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('token');
	};

	const getPostIdFromLocalStorage = () => {
		return localStorage.getItem('postId');
	};

	const handleContentChange = (newContent) => {
		setContent(newContent);
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
			const postId = getPostIdFromLocalStorage();
			await createPostAPI(content, files, token, postId);
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
