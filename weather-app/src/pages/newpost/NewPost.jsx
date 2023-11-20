import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/main/MainLayout';
import styled from 'styled-components';
import TopWrap from './TopWrap';
import ImageWrap from './ImageWrap';
import ContentWrap from './ContentWrap';
import ButtonWrap from './ButtonWrap';
import Modal from './Modal';
import { createPost } from '../../api/createPostApi';

const NewPost = () => {
	const [content, setContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const navigate = useNavigate();

	const handleContentChange = (newContent) => {
		setContent(newContent);
		setIsEditing(false);
	};

	const handleSave = () => {
		setShowModal(true); // 모달 표시
	};

	const handleConfirmSave = async () => {
		try {
			await createPost(content);
			navigate('/feed');
		} catch (error) {
			console.error('Failed to save post:', error);
		}
	};

	const handleCancelSave = () => {
		setShowModal(false);
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	return (
		<Main>
			<Container>
				<TopWrap />
				<ImageWrap />
				<ContentWrap onContentChange={handleContentChange} />
				{/* <PlaceWrap /> */}
				<ButtonWrap onSave={handleSave} isEditing={isEditing} />
				{showModal && (
					<Modal
						message="저장하시겠습니까?"
						onConfirm={handleConfirmSave}
						onCancel={handleCancelSave}
					/>
				)}
				{showDeleteModal && (
					<Modal
						message="정말로 삭제하시겠습니까?"
						onCancel={handleCancelDelete}
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
