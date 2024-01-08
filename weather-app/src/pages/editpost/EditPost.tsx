import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '../newpost/NewPostStyles';
import PostButtonWrap from '../newpost/PostButtonWrap';
import Modal from '../newpost/Modal';
import updatePost from '../../api/updatePostApi';
import { deletePost } from '../../api/deletePostApi';
import EditContent from './EditContent';
import EditImage from './EditImage';
import EditTopWrap from './EditTopWrap';
import Layout from '../../components/layout/Layout';
import fetchPost from '../../api/fetchPostApi';

const MAX_FILES = 3;

interface PostData {
	content: string;
	temperature: string;
	location: string;
	date: string;
	mediaUrls: string[];
	hashtagNames: string[];
	access_token: string; // 이 부분을 추가합니다.
}

const EditPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
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
					const postData = await fetchPost(postId);
					setContent(postData.content);
					const formattedHashtags = postData.hashtagNames
						.map((tag, index) => (index === 0 ? `#${tag}` : tag))
						.join(' '); // 여기서 해시태그를 문자열로 변환
					setHashtags(formattedHashtags);
					setTemperature(postData.temperature || '');
					setLocation(postData.location || '');
					setDate(postData.date || '');
					setMediaFiles(postData.mediaUrls || []);
				} else {
					console.error('Post ID is undefined');
					navigate('/'); // 적절한 리디렉션 또는 에러 처리
				}
			} catch (error) {
				console.error('Failed to fetch post:', error);
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
			setShowModal(false);
		}
	};

	const handleModalOpen = (deleteMode: boolean) => {
		setIsDelete(deleteMode);
		setShowModal(true);
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
					onSave={() => handleModalOpen(false)}
					onDelete={() => handleModalOpen(true)}
					onCancel={handleCancel}
					isEditing={true}
				/>
				{showModal && (
					<Modal
						message={
							isDelete ? '삭제하시겠습니까?' : '수정을 저장하시겠습니까?'
						}
						onConfirm={() => handleSaveDelete(isDelete)}
						onCancel={() => setShowModal(false)}
					/>
				)}
			</Container>
		</Layout>
	);
};

export default EditPost;
