import styled from 'styled-components';
import {
	BREAKPOINT_DESKTOP,
	BREAKPOINT_LARGE,
	BREAKPOINT_PHONE,
	BREAKPOINT_TABLET,
	mediaQueries,
} from '../../styles/MediaStyle';

export const Container = styled.div`
	width: 100%;
	max-width: 285px;
	height: 100%;
	max-height: 100%;
	position: fixed;
	top: 0;
	background-color: #5d6dbe;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	padding-bottom: 20px;
	z-index: 500;

	h1 {
		height: 20%;
		display: flex;
		align-items: flex-start;
		img {
			width: 100%;
		}
	}
	button {
		border: none;
		margin-top: 200px;
		background: none;
		img {
			width: 100%;
			max-width: 129px;
		}
	}
	${mediaQueries(BREAKPOINT_LARGE)} {
		max-width: 20%;
	}
	${mediaQueries(BREAKPOINT_DESKTOP)} {
		max-width: 18%;
		h1 {
			margin-top: -20px;
		}
	}
	${mediaQueries(BREAKPOINT_TABLET)} {
		max-width: 25%;
		h1 {
			margin-top: -20px;
		}
	}
	${mediaQueries(BREAKPOINT_PHONE)} {
		display: none;
	}
`;

export const NavWrap = styled.ul`
	/* width: 80%; */
	height: 30%;
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: space-around;

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
		}
		span {
			font-size: 1.125rem;
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
		${mediaQueries(BREAKPOINT_LARGE)} {
			span {
				font-size: 1rem;
			}
			${mediaQueries(BREAKPOINT_DESKTOP)} {
				span {
					font-size: 0.925rem;
				}
			}
			${mediaQueries(BREAKPOINT_TABLET)} {
				span {
					font-size: 0.725rem;
				}
			}
			${mediaQueries(BREAKPOINT_PHONE)} {
				span {
					font-size: 1.25rem;
				}
			}
		}
	}
`;

export const StyledMobileNav = styled.div`
	display: none;
	${mediaQueries(BREAKPOINT_PHONE)} {
		display: block;
		position: fixed;
		top: 90px;
		left: 0;
		width: 100%;
		z-index: 100;
	}
`;
