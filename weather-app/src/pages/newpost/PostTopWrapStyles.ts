// PostTopWrapStyles.ts
import styled from 'styled-components';
import {
	BREAKPOINT_TABLET,
	BREAKPOINT_PHONE,
	mediaQueries,
} from '../../styles/MediaStyle';

export const Wrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
		font-size: 0.825rem;
	}
	${mediaQueries(BREAKPOINT_PHONE)} {
		font-size: 0.625rem;
	}
`;

export const Top = styled.div`
	width: 100%;
	text-align: center;
	border-bottom: 2px solid #000;
`;

export const BackButton = styled.button`
	position: absolute;
	left: 0;
	top: 10px;
	border: none;
	background-color: transparent;
	display: flex;
	align-items: center;
	cursor: pointer;
	:hover {
		color: #5d6dbe;
	}
`;

export const Title = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 10px;
`;

export const Bottom = styled.div`
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;
	padding: 10px 0;
`;

export const Place = styled.div`
	display: flex;
	align-items: center;
`;

export const DateInfo = styled.div`
	margin-right: 10px;
`;
