import styled from 'styled-components';

export const FooterWrap = styled.div`
	max-width: 1440px;
	width: 100%;

	border-top: 1px solid #dddbdb;
	padding-bottom: 30px;
	margin: 0 auto;
	font-size: 12px;
	color: #555;
	line-height: 150%;
	@media screen and (max-width: 768px) {
		font-size: 0.4rem;
	}
	h1 {
		a {
			background-position: -19px -34px;
			width: 117px;
			height: 34px;
		}
	}
`;

export const FooterContent = styled.div`
	width: 40%;
	margin: 0 auto;
	margin-top: 20px;

	display: flex;
	justify-content: flex-end;
	div {
		margin-left: 50px;
	}
	@media screen and (max-width: 768px) {
		width: 90vw;
	}

	a {
		text-decoration: none;
		color: #555;
		&:last-child {
		}
		strong {
			font-weight: bold;
		}
		em {
			font-size: 24px;
			font-family: Tahoma;
			font-weight: bold;
			display: block;
			margin: 9px 0 11px 0;
		}
	}
	img {
		width: 2rem;
	}
	#git {
		width: 4rem;
		margin-right: 10px;
	}
`;
