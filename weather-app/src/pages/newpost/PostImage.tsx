// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, ChangeEvent } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
	Container,
	ImageUploadWrap,
	ImageUploader,
	UploadWrap,
	UploadButton,
	UploadText,
	ImagePreviewContainer,
	ImagePreview,
	VideoPreview,
	PrevButton,
	NextButton,
	DeleteButton,
} from './PostImageStyles';

const MAX_FILES = 3;

interface PostImageProps {
	initialFiles?: File[];
	onFilesChange: (files: (File | string)[]) => void;
}

const isVideo = (file: File | string): boolean => {
	return file instanceof File && file.type.split('/')[0] === 'video';
};

const PostImage: React.FC<PostImageProps> = ({
	initialFiles,
	onFilesChange,
}) => {
	const [files, setFiles] = useState<File[]>(initialFiles || []);
	const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);

	const handleFileDeletion = (index: number) => {
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		setFiles(updatedFiles);
		setCurrentFileIndex(0); // Reset to the first slide after deletion
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files).slice(
				0,
				MAX_FILES - files.length
			);
			setFiles((prevFiles) => {
				const updatedFiles = [...prevFiles, ...filesArray];
				setCurrentFileIndex(prevFiles.length > 0 ? currentFileIndex : 0);
				onFilesChange(updatedFiles); // 상위 컴포넌트에 파일 목록 전달
				return updatedFiles;
			});
		}
	};

	const handlePrev = () => {
		setCurrentFileIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const handleNext = () => {
		setCurrentFileIndex((prevIndex) =>
			prevIndex < files.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	// Clean up object URLs
	useEffect(() => {
		return () => {
			files.forEach((file) => {
				if (file instanceof File) {
					URL.revokeObjectURL(URL.createObjectURL(file)); // URL 해제
				}
			});
		};
	}, [files]);

	return (
		<Container>
			<ImageUploadWrap>
				<ImageUploader>
					<input
						type="file"
						multiple
						accept="image/*,video/*"
						onChange={handleFileChange}
						id="image-upload"
						hidden
						disabled={files.length >= MAX_FILES}
					/>
				</ImageUploader>
				{files.length > 0 && (
					<ImagePreviewContainer>
						<PrevButton onClick={handlePrev} disabled={currentFileIndex === 0}>
							<IoIosArrowBack />
						</PrevButton>
						{isVideo(files[currentFileIndex]) ? (
							<VideoPreview controls>
								<source
									src={URL.createObjectURL(files[currentFileIndex])}
									type={files[currentFileIndex].type}
								/>
								Your browser does not support the video tag.
							</VideoPreview>
						) : (
							<ImagePreview
								src={URL.createObjectURL(files[currentFileIndex])}
								alt="Uploaded content"
							/>
						)}
						<NextButton
							onClick={handleNext}
							disabled={currentFileIndex === files.length - 1}
						>
							<IoIosArrowForward />
						</NextButton>
					</ImagePreviewContainer>
				)}
			</ImageUploadWrap>
			<UploadWrap>
				<UploadButton
					htmlFor="image-upload"
					disabled={files.length >= MAX_FILES}
				>
					{files.length < MAX_FILES
						? '사진/동영상 추가하기'
						: '업로드 제한 도달'}
				</UploadButton>
				<UploadText>업로드된 파일 수: {files.length}</UploadText>
				<DeleteButton onClick={() => handleFileDeletion(currentFileIndex)}>
					Delete
				</DeleteButton>
			</UploadWrap>
		</Container>
	);
};

export default PostImage;
