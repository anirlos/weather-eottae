import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopWrap from '../newpost/TopWrap';
import ImageWrap from '../newpost/ImageWrap';
import ContentWrap from '../newpost/ContentWrap';
import ButtonWrap from '../newpost/ButtonWrap';
import Modal from '../newpost/Modal';
import { fetchPost } from './getPostApi';
import { updatePost } from './updatePostApi';

const EditPost = () => {
	const [content, setContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditing, setIsEditing] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			fetchPost(id)
				.then((data) => {
					setContent(data.content); // 데이터 구조에 맞게 조정
				})
				.catch((error) => {
					console.error(error);
					// 사용자에게 에러 발생 알림 (선택적)
				});
		}
	}, [id]);

	const handleSave = () => {
		updatePost(id, content)
			.then(() => {
				setIsEditing(false);
				navigate('/'); // 홈으로 리디렉션
			})
			.catch((error) => {
				console.error(error);
				// 사용자에게 에러 발생 알림 (선택적)
			});
	};

	const handleDelete = () => {
		setShowDeleteModal(true); // 삭제 확인 모달 표시
	};

	const handleConfirmDelete = () => {
		const postId = parseInt(id, 10); // useParams에서 가져온 id 사용

		// 로컬 스토리지에서 게시물 목록 가져오기
		const posts = JSON.parse(localStorage.getItem('posts')) || [];

		// 삭제할 게시물을 제외한 목록 필터링
		const updatedPosts = posts.filter((post) => post.id !== postId);

		// 업데이트된 목록을 로컬 스토리지에 저장
		localStorage.setItem('posts', JSON.stringify(updatedPosts));

		// 모달 닫기 및 홈 페이지로 리디렉션
		setShowDeleteModal(false);
		navigate('/'); // 홈 페이지로 리디렉션
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	return (
		<Container>
			<TopWrap />
			<ImageWrap />
			<ContentWrap />
			{/* <PlaceWrap /> */}
			<ButtonWrap
				onSave={handleSave}
				onDelete={handleDelete}
				isEditing={isEditing}
			/>
			{showModal && (
				<Modal
					message="수정하시겠습니까?"
					onConfirm={handleSave}
					onCancel={() => setShowModal(false)}
				/>
			)}
			{showDeleteModal && (
				<Modal
					message="정말로 삭제하시겠습니까?"
					onConfirm={handleConfirmDelete}
					onCancel={handleCancelDelete}
				/>
			)}
		</Container>
	);
};

export default EditPost;

const Container = styled.div`
	width: 1000px;
	max-width: 100%;
	margin: 15px auto 0;
	position: relative;
`;
