import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	max-width: 1440px;
	margin: 0 auto;
	align-items: center;
	background-color: #ededed;
	@media (max-width: 430px) {
		flex-direction: column;
	}
`;

export const Wrap = styled.div`
	width: 80%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	@media (max-width: 430px) {
	}
`;

export const MainWrap = styled.div`
	width: 100%;
	margin: 0 auto;
	padding-bottom: 50px;
	box-sizing: border-box;

	@media (max-width: 430px) {
		padding-bottom: 100px; // 필요한 경우 여기를 조정합니다.
		position: relative;
		top: 80px;

		min-height: calc(100% - 100px); // 푸터의 높이를 여기에 맞춰서 설정하세요.
		overflow-y: scroll;
	}
`;
