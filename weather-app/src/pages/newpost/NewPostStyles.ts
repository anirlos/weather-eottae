import styled from 'styled-components';
import { BREAKPOINT_TABLET, mediaQueries } from '../../styles/MediaStyle';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	max-width: 700px;
	margin: 30px auto;
	padding: 30px 0;
	background: #fff;
	border-radius: 10px;
	box-shadow: 2px 4px 10px 0 #dcdbdb;
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 80%;
	}
`;

export const Message = styled.div`
	background: #5d6dbe;
	padding: 80px;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
	display: flex;
	flex-direction: column;
	p {
		color: #fff;
		margin-bottom: 20px;
	}
`;

export const ButtonWrap = styled.div`
	display: flex;
	button {
		display: flex;
		flex-direction: row;
		border: none;
		padding: 10px 15px;
		margin-right: 10px;
		border-radius: 5px;
		background-color: #4c5ca7;
		color: #fff;
		font-weight: bold;
		cursor: pointer;
		font-family: 'jua', sans-serif;

		&:hover {
			color: #5d6dbe;
			background-color: #e0e0e0;
		}
	}
`;
