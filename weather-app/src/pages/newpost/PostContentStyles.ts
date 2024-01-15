import styled from 'styled-components';
import {
	BREAKPOINT_TABLET,
	BREAKPOINT_PHONE,
	mediaQueries,
} from '../../styles/MediaStyle';

export const Container = styled.div`
	max-width: 600px;
	margin: 10px auto;
	padding-bottom: 20px;
	background-color: #fff;
	border-bottom: 2px solid #000;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const ContentTextarea = styled.textarea`
	width: 100%;
	height: 7vh;
	margin: 5px auto 10px;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #000;
	border-radius: 10px;
	font-family: 'jua', sans-serif;
`;

export const HashtagTextarea = styled.textarea`
	width: 100%;
	height: 3vh;
	margin: 5px auto;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid #000;
	border-radius: 10px;
	font-family: 'jua', sans-serif;
`;
