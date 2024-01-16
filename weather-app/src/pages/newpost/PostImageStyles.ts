import styled from 'styled-components';
import {
	BREAKPOINT_TABLET,
	BREAKPOINT_PHONE,
	mediaQueries,
} from '../../styles/MediaStyle';

export const Container = styled.div`
	max-width: 600px;
	margin: 20px auto;
	border-radius: 15px;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const ImageUploadWrap = styled.div`
	max-width: 600px;
	width: 100%;
	height: 40vh;
	margin: 20px auto;
	position: relative;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 100%;
	}
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
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 100%;
	}
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
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
`;

export const UploadButton = styled.label<{ disabled: boolean }>`
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

	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 40%;
		font-size: 0.825rem;
	}

	&:hover {
		background: #0056b3;
	}

	${(props) =>
		props.disabled &&
		`
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

export const UploadText = styled.div`
	text-align: center;
	${mediaQueries(BREAKPOINT_TABLET)} {
		font-size: 0.725rem;
	}
	${mediaQueries(BREAKPOINT_PHONE)} {
		font-size: 0.625rem;
	}
`;

export const ImagePreviewContainer = styled.div`
	width: 600px;
	height: 100%;
	margin: 0 auto;
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 100%;
	}
`;

export const ImagePreview = styled.img`
	max-width: 100%;
	max-height: 100%;
	display: block;
	object-fit: contain;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const VideoPreview = styled.video`
	max-width: 100%;
	max-height: 100%;
	display: block;
	object-fit: contain;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const ImageNavigationButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: #fff;
	color: #000;
	border-radius: 50%;
	cursor: pointer;
	padding: 10px;
	z-index: 2;
	border-color: transparent;

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

export const DeleteButton = styled.button`
	width: 80px;
	border: none;
	padding: 8px;
	border-radius: 15px;
	margin-left: 10px;
	background-color: #adadad;
	color: #fff;
	font-family: 'jua', sans-serif;
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
	${mediaQueries(BREAKPOINT_PHONE)} {
		width: 80px;
		font-size: 0.625rem;
	}
	&:hover {
		background-color: #8c8c8c; // 호버 시 배경색 변경
	}
	&:last-child {
		background-color: #5d6dbe;
		&:hover {
			background-color: #4c5ca7; // 호버 시 배경색 변경
		}
	}
`;
