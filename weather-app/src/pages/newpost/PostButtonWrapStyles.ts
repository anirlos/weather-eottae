import styled from 'styled-components';

export const Wrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: flex-end;

	button {
		width: 80px;
		border: none;
		padding: 8px;
		border-radius: 15px;
		margin-left: 10px;
		background-color: #adadad;
		color: #fff;
		font-family: 'jua', sans-serif;

		&:hover {
			background-color: #8c8c8c;
		}

		&:last-child {
			background-color: #5d6dbe;

			&:hover {
				background-color: #4c5ca7;
			}
		}
	}
`;
