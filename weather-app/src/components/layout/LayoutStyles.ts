import styled from 'styled-components';
import {
	BREAKPOINT_DESKTOP,
	BREAKPOINT_LARGE,
	BREAKPOINT_PHONE,
	BREAKPOINT_TABLET,
	mediaQueries,
} from '../../styles/MediaStyle';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	max-width: 1440px;
	margin: 0 auto;
	align-items: center;
	background-color: #ededed;

	${mediaQueries(BREAKPOINT_PHONE)} {
		flex-direction: column;
	}
`;

export const Wrap = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	${mediaQueries(BREAKPOINT_TABLET)} {
	}
	${mediaQueries(BREAKPOINT_PHONE)} {
		width: 100%;
		padding-bottom: 0;
	}
`;

export const MainWrap = styled.div`
	width: 100%;
	margin: 0 auto;
	padding-bottom: 50px;
	box-sizing: border-box;
	${mediaQueries(BREAKPOINT_DESKTOP)} {
	}
	${mediaQueries(BREAKPOINT_TABLET)} {
		width: 85%;
	}

	${mediaQueries(BREAKPOINT_PHONE)} {
		padding-bottom: 100px; // 필요한 경우 여기를 조정합니다.
		position: relative;
		top: 80px;

		min-height: calc(100% - 100px); // 푸터의 높이를 여기에 맞춰서 설정하세요.
		overflow-y: scroll;
	}
`;
