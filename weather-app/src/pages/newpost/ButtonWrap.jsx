import React from 'react';
import styled from 'styled-components';

const ButtonWrap = ({ onSave, onDelete, isEditing }) => {
	return (
		<Wrap>
			{isEditing ? (
				<>
					<button onClick={onDelete}>삭제</button>
					<button onClick={onSave}>수정</button>
				</>
			) : (
				<>
					<button onClick={onDelete}>취소</button>
					<button onClick={onSave}>저장</button>
				</>
			)}
		</Wrap>
	);
};

export default ButtonWrap;

const Wrap = styled.div`
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
		&:last-child {
			background-color: #5d6dbe;
		}
	}
`;
