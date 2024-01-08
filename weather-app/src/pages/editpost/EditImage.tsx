import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
	Container,
	ButtonGroup,
	ImagePreviewContainer,
	PrevButton,
	NextButton,
	ImageUploader,
	UploadWrap,
	UploadButton,
	UploadText,
	DeleteButton,
} from './EditImageStyles';

interface EditImageProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	mediaFiles: (string | File)[];
	setMediaFiles: React.Dispatch<React.SetStateAction<(string | File)[]>>;

	MAX_FILES: number;
}

const EditImage: React.FC<EditImageProps> = ({
	onChange,
	mediaFiles,
	setMediaFiles,
	MAX_FILES,
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleFileAddition = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (mediaFiles.length < MAX_FILES && event.target.files) {
			const newFiles = Array.from(event.target.files);
			setMediaFiles([...mediaFiles, ...newFiles].slice(0, MAX_FILES));
		}
	};

	const handleFileDeletion = (index: number) => {
		const updatedFiles = mediaFiles.filter(
			(_, fileIndex) => fileIndex !== index
		);
		setMediaFiles(updatedFiles);
		setCurrentSlide(0);
	};

	const createFileUrl = (file: File) => {
		try {
			return URL.createObjectURL(file);
		} catch (error) {
			console.error('Error creating object URL:', error);
			return '';
		}
	};

	const isVideoFile = (fileOrString: string | File): boolean => {
		if (typeof fileOrString === 'string') {
			// 여기서는 파일 확장자나 다른 방법으로 비디오 파일인지 판단할 수 있습니다.
			// 예를 들어, URL이 '.mp4', '.webm' 등으로 끝나는지 확인할 수 있습니다.
			return fileOrString.endsWith('.mp4') || fileOrString.endsWith('.webm');
		} else {
			// File 객체의 경우 MIME 타입을 사용합니다.
			return fileOrString.type.split('/')[0] === 'video';
		}
	};

	const prevSlide = () => {
		if (mediaFiles.length > 1) {
			setCurrentSlide(
				(prev) => (prev - 1 + mediaFiles.length) % mediaFiles.length
			);
		}
	};

	const nextSlide = () => {
		if (mediaFiles.length > 1) {
			setCurrentSlide((prev) => (prev + 1) % mediaFiles.length);
		}
	};

	const renderMedia = (fileOrString: string | File) => {
		let url: string;

		if (typeof fileOrString === 'string') {
			// 문자열이면 이미 URL로 간주
			url = fileOrString;
		} else {
			// File 객체면 URL 생성
			url = createFileUrl(fileOrString);
		}

		if (isVideoFile(fileOrString)) {
			// 비디오 파일 처리
			return <video src={url} controls />;
		} else {
			// 이미지 파일 처리
			return <img src={url} alt="Media file" />;
		}
	};

	return (
		<Container>
			{mediaFiles.length > 0 && (
				<ImagePreviewContainer>
					{renderMedia(mediaFiles[currentSlide])}
					<ButtonGroup>
						<PrevButton onClick={prevSlide}>
							<IoIosArrowBack />
						</PrevButton>
						<NextButton onClick={nextSlide}>
							<IoIosArrowForward />
						</NextButton>
					</ButtonGroup>
				</ImagePreviewContainer>
			)}
			<ImageUploader>
				<input
					type="file"
					multiple
					accept="image/*,video/*"
					onChange={handleFileAddition}
					disabled={mediaFiles.length >= MAX_FILES}
					id="image-upload"
					hidden
				/>
			</ImageUploader>

			<UploadWrap>
				<UploadButton htmlFor="image-upload">
					{mediaFiles.length < MAX_FILES
						? '사진/동영상 추가하기'
						: '업로드 제한 도달'}
				</UploadButton>
				<UploadText>업로드된 파일 수: {mediaFiles.length}</UploadText>
				<DeleteButton onClick={() => handleFileDeletion(currentSlide)}>
					Delete
				</DeleteButton>
			</UploadWrap>
		</Container>
	);
};

export default EditImage;
