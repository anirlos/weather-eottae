import styled from 'styled-components';

export const Wrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Top = styled.div`
	width: 600px;
	margin: 0 auto;
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
	width: 600px;
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2px solid #000;
`;

export const Place = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
`;

export const DateInfo = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 30%;
`;
