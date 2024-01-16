import styled from 'styled-components';

export const Container = styled.div`
	width: 90%;
	margin: 0 auto;
	height: 80px;
	align-items: center;
	display: flex;
	justify-content: space-between;
	@media (max-width: 1024px) {
	}
	@media (max-width: 768px) {
		height: auto;
	}
	@media (max-width: 430px) {
		display: none;
	}
`;

export const CurrentInfo = styled.div`
	width: 40%;
	display: flex;
	justify-content: flex-start;
	font-size: 1rem;
	@media (max-width: 1024px) {
		font-size: 0.825rem;
	}
	@media (max-width: 768px) {
		width: 100%;
		justify-content: center;
		margin-bottom: 10px;
	}

	@media (max-width: 430px) {
		display: none;
	}
`;

export const RegionInfo = styled.div`
	margin-right: 20px;
	span {
		display: flex;
		align-items: center;
		justify-content: space-around;

		color: #000;
		img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}
`;

export const DateInfo = styled.div`
	span {
		display: flex;
		align-items: center;
		justify-content: space-around;

		color: #000;

		img {
			width: 30px;
			height: 30px;
			margin-right: 10px;
		}
	}

	@media (max-width: 430px) {
		span {
			justify-content: center;
			img {
				width: 25px;
				height: 25px;
			}
		}
	}
`;

export const ProfileWrap = styled.div`
	img {
		width: 35px;
		height: 35px;
	}

	@media (max-width: 768px) {
		img {
			width: 30px;
			height: 30px;
		}
	}
`;
