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
		setIsEditing(true); // 내용이 변경될 때 편집 모드로 설정
	};

	const handleSave = () => {
		setShowModal(true); // 모달 표시
	};

	const handleConfirmSave = async () => {
		try {
			// 게시물 생성 API 호출
			await createPost({
				content,
				accountNonExpired: true, // 예시 데이터 (필요한 경우 수정)
				accountNonLocked: true,
				authorities: ['ROLE_USER'],
				credentialsNonExpired: true,
				enabled: true,
				hashtags: [], // 해시태그 목록 추가
				location: 'Sample Location', // 위치 정보 추가
				mediaFiles: [], // 미디어 파일 목록 추가
				password: 'password123',
				temperature: 25.5, // 온도 정보 추가
				username: 'example_user',
			});
			navigate('/feed'); // 생성 성공 시 /feed 페이지로 이동
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
