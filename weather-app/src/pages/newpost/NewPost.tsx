import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from './NewPostStyles';
import Layout from '../../components/layout/Layout';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButtonWrap from './PostButtonWrap';
import Modal from './Modal';
import createPostAPI from '../../api/createPostApi';
import PostTopWrap from './PostTopWrap';

const NewPost: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);
	const [hashtags, setHashtags] = useState<string>('');
	const [temperature, setTemperature] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
	const [alertMessage, setAlertMessage] = useState<string>('');
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
	const navigate = useNavigate();

	const getTokenFromLocalStorage = (): string | null => {
		return localStorage.getItem('access_token');
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleHashtagsChange = (newHashtags: string) => {
		setHashtags(newHashtags);
	};

	const handleFilesChange = (newFiles: File[]) => {
		setFiles(newFiles);
	};

	const handleLocationChange = (newLocation: string) => {
		setLocation(newLocation); // 위치 상태 업데이트
	};

	const handleTemperatureChange = (newTemperature: number) => {
		setTemperature(newTemperature.toString()); // 숫자를 문자열로 변환
	};

	const handleSave = () => {
		// 내용과 이미지가 모두 입력되었는지 검사
		if (!content.trim() || files.length === 0) {
			setAlertMessage('내용과 이미지를 모두 입력해주세요.');
			setShowAlertModal(true);
			return;
		}
		setShowModal(true); // 모든 조건이 충족됐을 때만 저장 확인 모달 표시
	};

	const handleCancel = () => {
		setShowCancelModal(true); // 취소 모달 표시
	};

	const handleConfirmCancel = () => {
		navigate('/'); // 메인 페이지로 리디렉션
	};

	const handleConfirmSave = async () => {
		try {
			const safeFiles = files || [];
			const token = getTokenFromLocalStorage();

			if (token) {
				// token이 null이 아닌 경우에만 API 호출
				await createPostAPI(
					content,
					temperature, // 문자열을 숫자로 변환
					location,
					safeFiles,
					hashtags,
					token
				);
				setShowModal(false);
				navigate('/feed');
			} else {
				// 적절한 오류 처리
			}
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};
	const handleCancelSave = () => {
		navigate('/feed');
		setShowModal(false);
	};

	useEffect(() => {
		const token = getTokenFromLocalStorage();
		if (!token) {
			setShowLoginModal(true); // 로그인 모달 표시
		} else {
			setIsAuthenticated(true);
		}
	}, [navigate]);

	const handleConfirmLogin = () => {
		navigate('/login'); // 로그인 페이지로 이동
	};

	if (showLoginModal) {
		return (
			<Modal
				message="로그인이 필요합니다."
				onConfirm={handleConfirmLogin}
				onCancel={undefined}
			/>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Layout>
			<Container>
				<PostTopWrap
					onLocationUpdate={handleLocationChange}
					onTemperatureChange={handleTemperatureChange}
				/>
				<PostImage
					onFilesChange={
						handleFilesChange as (files: (string | File)[]) => void
					}
				/>
				<PostContent
					content={content}
					hashtags={hashtags}
					onContentChange={handleContentChange}
					onHashtagsChange={handleHashtagsChange}
				/>
				<PostButtonWrap
					onSave={handleSave}
					onCancel={handleCancel}
					isEditing={false}
				/>
				{showModal && (
					<Modal
						message="저장하시겠습니까?"
						onConfirm={handleConfirmSave}
						onCancel={handleCancelSave} // onCancel prop 추가
					/>
				)}
				{showAlertModal && (
					<Modal
						message={alertMessage}
						onConfirm={() => setShowAlertModal(false)}
						onCancel={handleCancelSave} // 취소 버튼 없이 '확인' 버튼만 표시
					/>
				)}
				{showCancelModal && (
					<Modal
						message="작성을 취소하시겠습니까?"
						onConfirm={handleConfirmCancel}
						onCancel={() => setShowCancelModal(false)}
					/>
				)}
			</Container>
		</Layout>
	);
};

export default NewPost;
