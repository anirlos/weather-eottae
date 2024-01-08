import React from 'react';
import { Wrap } from './PostButtonWrapStyles';

interface PostButtonWrapProps {
	onSave: () => void;
	onDelete?: () => void;
	onCancel: () => void;
	isEditing: boolean;
}

const PostButtonWrap: React.FC<PostButtonWrapProps> = ({
	onSave,
	onDelete,
	onCancel,
	isEditing,
}) => {
	return (
		<Wrap>
			{isEditing ? (
				<>
					<button onClick={onCancel}>취소</button>
					<button onClick={onDelete}>삭제</button>
					<button onClick={onSave}>수정</button>
				</>
			) : (
				<>
					<button onClick={onCancel}>취소</button>
					<button onClick={onSave}>저장</button>
				</>
			)}
		</Wrap>
	);
};

export default PostButtonWrap;
