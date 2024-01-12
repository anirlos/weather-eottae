import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import Modal from '../../components/modal/Modal';
import { Container, Message } from './NewPostStyles';
import Layout from '../../components/layout/Layout';
import PostImage from './PostImage';
import PostContent from './PostContent';
import PostButtonWrap from './PostButtonWrap';
import createPostAPI from '../../api/createPostApi';
import PostTopWrap from './PostTopWrap';

const NewPost: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');
	const [files, setFiles] = useState<File[]>([]);
	const [hashtags, setHashtags] = useState<string>('');
	const [temperature, setTemperature] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [alertMessage, setAlertMessage] = useState<string>('');
	const navigate = useNavigate();

	const loginModal = useModal();
	const alertModal = useModal();
	const saveModal = useModal();
	const cancelModal = useModal();

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
		if (!content.trim() || files.length === 0) {
			setAlertMessage('내용과 이미지를 모두 입력해주세요.');
			alertModal.open();
			return;
		}
		saveModal.open();
	};

	const handleCancel = () => {
		cancelModal.open();
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
				saveModal.close();
				navigate('/feed');
			} else {
				// 적절한 오류 처리
			}
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	useEffect(() => {
		const token = getTokenFromLocalStorage();
		if (!token) {
			loginModal.open();
		} else {
			setIsAuthenticated(true);
		}
	}, [navigate]);

	if (loginModal.isOpen) {
		return (
			<Modal
				isOpen={loginModal.isOpen}
				onClose={() => navigate('/login')}
				useBg
			>
				<div>로그인이 필요합니다.</div>
			</Modal>
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

				{/* Login 모달 */}
				<Modal
					isOpen={loginModal.isOpen}
					onClose={() => navigate('/login')}
					useBg
				>
					{/* 모달 내용 */}
					<Message>로그인이 필요합니다.</Message>
				</Modal>

				{/* Alert 모달 */}
				<Modal isOpen={alertModal.isOpen} onClose={alertModal.close} useBg>
					{/* 모달 내용 */}
					<Message>{alertMessage}</Message>
				</Modal>

				{/* Save 모달 */}
				<Modal isOpen={saveModal.isOpen} onClose={saveModal.close} useBg>
					{/* 모달 내용 */}
					<Message>
						<p>저장하시겠습니까?</p>
						<button onClick={handleConfirmSave}>네</button>
						<button onClick={saveModal.close}>아니오</button>
					</Message>
				</Modal>

				{/* Cancel 모달 */}
				<Modal isOpen={cancelModal.isOpen} onClose={cancelModal.close} useBg>
					{/* 모달 내용 */}
					<Message>
						<p>작성을 취소하시겠습니까?</p>
						<button onClick={handleConfirmCancel}>네</button>
						<button onClick={cancelModal.close}>아니오</button>
					</Message>
				</Modal>
			</Container>
		</Layout>
	);
};

export default NewPost;
