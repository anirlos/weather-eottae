import styled from 'styled-components';
import { BREAKPOINT_TABLET, mediaQueries } from '../../styles/MediaStyle';

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
	}
`;

export const Top = styled.div`
	max-width: 600px;
	width: 100%;
	text-align: center;
	border-bottom: 2px solid #000;
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
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
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
	:hover {
		color: #5d6dbe;
	}
`;

export const Title = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 10px;
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
`;

export const Bottom = styled.div`
	max-width: 600px;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;
	padding: 10px 0;

	${mediaQueries(BREAKPOINT_TABLET)} {
	}
`;

export const Place = styled.div`
	display: flex;
	align-items: center;
`;

export const DateInfo = styled.div`
	margin-right: 10px;
`;
