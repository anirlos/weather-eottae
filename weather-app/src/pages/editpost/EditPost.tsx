import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ButtonWrap, Container, Message } from '../newpost/NewPostStyles';
import PostButtonWrap from '../newpost/PostButtonWrap';
import Modal from '../../components/modal/Modal';
import updatePost from '../../api/updatePostApi';
import { deletePost } from '../../api/deletePostApi';
import EditContent from './EditContent';
import EditImage from './EditImage';
import EditTopWrap from './EditTopWrap';
import Layout from '../../components/layout/Layout';
import fetchPostApi from '../../api/fetchPostApi';
import useModal from '../../hooks/useModal';

const MAX_FILES = 3;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PostData {
	content: string;
	temperature: string;
	location: string;
	date: string;
	mediaUrls: string[];
	hashtagNames: string;
	access_token: string; // 이 부분을 추가합니다.
}

const EditPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const { isOpen: showModal, open: openModal, close: closeModal } = useModal();
	const [date, setDate] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [temperature, setTemperature] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [mediaFiles, setMediaFiles] = useState<(File | string)[]>([]);

	const [hashtags, setHashtags] = useState<string>('');

	useEffect(() => {
		const loadPost = async () => {
			setIsLoading(true);
			try {
				if (postId) {
					const postData = await fetchPostApi(postId);
					if (postData) {
						setContent(postData.content);

						// postData.hashtagNames가 문자열인 경우만 split을 사용합니다.
						const formattedHashtags = postData.hashtagNames
							.map((tag: string, index: number) =>
								index === 0 ? `#${tag}` : ` #${tag}`
							)
							.join('');
						setHashtags(formattedHashtags);

						setTemperature(postData.temperature || '');
						setLocation(postData.location || '');
						setDate(postData.date || '');
						setMediaFiles(postData.mediaUrls || []);
					} else {
						console.error('Post data is null');
					}
				} else {
					console.error('Post ID is undefined');
				}
			} catch (error) {
				console.error('Error loading post:', error);
			} finally {
				setIsLoading(false);
			}
		};
		loadPost();
	}, [postId, navigate]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getTokenFromLocalStorage = (): string | null => {
		return localStorage.getItem('access_token');
	};

	const handleSaveDelete = async (deleteFlag: boolean) => {
		console.log('Delete flag:', deleteFlag);
		try {
			if (deleteFlag) {
				// 삭제 로직
				if (postId) {
					await deletePost(postId);
					navigate('/user');
				} else {
					console.error('Post ID is undefined');
				}
			} else {
				// 업데이트 로직
				if (postId) {
					const access_token = localStorage.getItem('access_token'); // 토큰 가져오기
					if (access_token) {
						await updatePost(
							content,
							temperature,
							location,
							postId,
							mediaFiles,
							hashtags,
							access_token
						);
						navigate('/user');
					} else {
						console.error('Access token is undefined');
					}
				} else {
					console.error('Post ID is undefined');
				}
			}
		} catch (error) {
			console.error(
				`Failed to ${deleteFlag ? 'delete' : 'update'} post:`,
				error
			);
		} finally {
			closeModal(); // 모달을 닫습니다.
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			// 여기서 파일 객체와 파일 이름을 모두 포함하는 배열을 생성합니다.
			const filesArray: (File | string)[] = Array.from(event.target.files).map(
				(file) => {
					// 여기서 파일 이름을 사용하고 싶다면 'file.name'을 반환합니다.
					// 파일 객체를 사용하고 싶다면 'file'을 반환합니다.
					return file; // 파일 객체를 반환
					// return file.name; // 파일 이름을 반환
				}
			);
			setMediaFiles(filesArray);
		}
	};

	const handleCancel = () => {
		navigate('/feed');
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<Layout>
			<Container>
				<EditTopWrap
					temperature={temperature}
					location={location}
					date={date}
				/>
				<EditImage
					onChange={handleFileChange}
					mediaFiles={mediaFiles}
					setMediaFiles={setMediaFiles}
					MAX_FILES={MAX_FILES}
				/>
				<EditContent
					content={content}
					setContent={setContent}
					hashtags={hashtags}
					setHashtags={setHashtags}
				/>
				<PostButtonWrap
					onSave={() => {
						setIsDelete(false);
						openModal();
					}} // Set isDelete to false for saving
					onDelete={() => {
						setIsDelete(true);
						openModal();
					}} // Set isDelete to true for deletion
					onCancel={handleCancel}
					isEditing={true}
				/>
				{showModal && (
					<Modal
						isOpen={showModal}
						onClose={() => closeModal()} // 모달을 닫도록 변경합니다.
						useBg={true}
					>
						<Message>
							<p>
								{isDelete ? '삭제하시겠습니까?' : '수정을 저장하시겠습니까?'}
							</p>
							<ButtonWrap>
								{' '}
								<button onClick={() => handleSaveDelete(isDelete)}>확인</button>
								<button onClick={() => closeModal()}>취소</button>{' '}
							</ButtonWrap>
							{/* 모달을 닫도록 변경합니다. */}
						</Message>
					</Modal>
				)}
			</Container>
		</Layout>
	);
};

export default EditPost;
