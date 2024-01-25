import styled from 'styled-components';
import {
	BREAKPOINT_DESKTOP,
	BREAKPOINT_LARGE,
	BREAKPOINT_PHONE,
	BREAKPOINT_TABLET,
	mediaQueries,
} from '../../styles/MediaStyle';

interface WrapProps {
	isVisible: boolean;
}

export const Container = styled.div`
	width: 100%;
	height: 100%;
	max-height: 10%;
	position: fixed;
	top: 0;
	background-color: #5d6dbe;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 2px solid #fff;
`;

export const HamburgerMenu = styled.div`
	width: 30px;
	height: 25px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	cursor: pointer;
	z-index: 510;

	div {
		height: 3px;
		background-color: #fff;
	}
`;

export const TopWrap = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export const Wrap = styled.div<WrapProps>`
	display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 90vh; // 100vh에서 Container의 높이만큼 제외
	position: fixed;
	top: ${({ isVisible }) => (isVisible ? '10%' : '-100vh')};
	left: 0;
	overflow-y: auto; // 내용이 많아질 경우 스크롤
	background-color: #5d6dbe;

	z-index: 500;
	transition: top 0.5s ease-in-out;
	border-top: 2px solid #fff;
`;

export const LogoWrap = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	h1 {
		width: 80%;
		img {
			width: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

export const NavWrap = styled.ul`
	display: flex;
	position: absolute;
	top: 10%;
	left: 27%;
	height: 50%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;

	li {
		width: 100%;
		display: flex;
		color: #fff;

		&:hover {
			border-radius: 10px;
			background-color: #edebeb;

			img {
				color: #000;
				background-color: #5d6dbe;
			}
			span {
				color: #5d6dbe;
				font-weight: bold;
			}
		}

		a {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 6px;
			p {
				text-align: center;
			}
		}
		span {
			font-size: 1.4rem;
			color: inherit;
			margin-left: 5px;
			display: flex;
			align-items: center;
			transition: color 0.3s;

			img {
				width: 20px;
				height: 18px;
				object-fit: contain;
				padding: 5px;
				border-radius: 30%;
				margin-right: 5px;
				background: #c4c4c4;
				transition: background-color 0.3s;
			}
		}
	}
`;

export const LoginWrap = styled.div`
	position: absolute;
	bottom: 20%;
	color: #fff;
`;
