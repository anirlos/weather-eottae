import styled from 'styled-components';
import { BREAKPOINT_TABLET, mediaQueries } from '../../styles/MediaStyle';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-bottom: 10px;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const ImagePreviewContainer = styled.div`
	width: 600px;
	height: 40vh;
	margin: 20px auto;
	position: relative;
	text-align: center;
	background-color: #ededed;
	border-radius: 15px;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 100%;
	}

	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const ImageNavigationButton = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: #fff;
	color: #000;
	border-radius: 50%;
	cursor: pointer;
	padding: 10px;
	z-index: 2;

	&:hover {
		background-color: #5d6dbe;
		color: #fff;
	}
`;

export const PrevButton = styled(ImageNavigationButton)`
	left: 5%;
`;

export const NextButton = styled(ImageNavigationButton)`
	right: 5%;
`;

export const ImageUploader = styled.div`
	max-width: 600px;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 0 auto;
	background-color: #ededed;
	border-radius: 15px;
`;

export const UploadWrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 10px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;
	border-top: 2px solid #000;
	padding-top: 10px;
`;

export const UploadButton = styled.label`
	width: 200px;
	display: flex;
	justify-content: center;
	padding: 10px 10px;
	background: #5d6dbe;
	color: #fff;
	border-radius: 5px;
	cursor: pointer;
	text-align: center;
	margin-bottom: 10px;

	&:hover {
		background: #0056b3;
	}
`;

export const UploadText = styled.div`
	text-align: center;
`;

export const DeleteButton = styled.button`
	width: 80px;
	border: none;
	padding: 8px;
	border-radius: 15px;
	margin-left: 10px;
	background-color: #adadad;
	color: #fff;
	font-family: 'jua', sans-serif;

	&:hover {
		background-color: #8c8c8c;
	}
`;
