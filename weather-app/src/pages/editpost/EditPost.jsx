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
import { deletePost } from '../../api/deletePostApi';

const EditPost = () => {
	const [content, setContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditing, setIsEditing] = useState(true);

	const { id } = useParams();
	const navigate = useNavigate();

	const postId = 1; // 가져올 더미 데이터의 ID를 지정
	fetchPost(postId)
		.then((data) => {
			console.log('Fetched data:', data);
			// 여기에서 데이터를 사용하거나 처리합니다.
		})
		.catch((error) => {
			console.error('Error fetching post:', error);
			// 오류 처리
		});

	useEffect(() => {
		if (id) {
			fetchPost(id)
				.then((data) => {
					setContent(data.content);
				})
				.catch((error) => {
					console.error(error);
					// 에러 처리
				});
		}
	}, [id]);

	const handleContentChange = (newContent) => {
		setContent(newContent);
		setIsEditing(true);
	};

	const handleSave = () => {
		setShowModal(true); // 수정 확인 모달 표시
	};

	const handleConfirmSave = async () => {
		try {
			await updatePost(id, { content });
			navigate('/'); // 홈으로 리디렉션
		} catch (error) {
			console.error(error);
			// 에러 처리
		}
	};

	const handleDelete = () => {
		setShowDeleteModal(true); // 삭제 확인 모달 표시
	};

	const handleConfirmDelete = async () => {
		try {
			await deletePost(id); // 포스트 삭제
			navigate('/'); // 홈으로 리디렉션
		} catch (error) {
			console.error(error);
			// 에러 처리
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setShowModal(false);
		setShowDeleteModal(false); // 모달을 닫을 때 showDeleteModal도 닫아야 합니다.
	};

	return (
		<Container>
			<TopWrap />
			<ImageWrap />
			<ContentWrap content={content} onContentChange={handleContentChange} />
			{/* <PlaceWrap /> */}
			<ButtonWrap
				onSave={handleSave}
				onDelete={handleDelete}
				onCancel={handleCancel}
				isEditing={isEditing}
			/>

			{showDeleteModal && (
				<Modal
					message="삭제하시겠습니까?"
					onConfirm={handleConfirmDelete} // 삭제 확인 모달에서 삭제 버튼 클릭 시
					onCancel={handleCancel}
				/>
			)}

			{showModal && (
				<Modal
					message="수정을 저장하시겠습니까?"
					onConfirm={handleConfirmSave} // 수정 확인 모달에서 저장 버튼 클릭 시
					onCancel={handleCancel}
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
