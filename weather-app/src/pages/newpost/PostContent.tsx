import React from 'react';
import {
	Container,
	ContentTextarea,
	HashtagTextarea,
} from './PostContentStyles';

interface PostContentProps {
	content: string;
	hashtags: string;
	onContentChange: (content: string) => void;
	onHashtagsChange: (hashtags: string) => void;
}

const PostContent: React.FC<PostContentProps> = ({
	content,
	hashtags,
	onContentChange,
	onHashtagsChange,
}) => {
	const handleContentChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		onContentChange(event.target.value);
	};

	const handleHashtagsChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		onHashtagsChange(event.target.value);
	};

	return (
		<Container>
			<ContentTextarea
				id="contentField"
				value={content}
				onChange={handleContentChange}
				maxLength={300}
				placeholder="내용을 입력하세요."
			/>
			<label htmlFor="hashtagsField">해시태그</label>
			<HashtagTextarea
				id="hashtagsField"
				value={hashtags}
				onChange={handleHashtagsChange}
				maxLength={200}
				placeholder="#해시태그를 입력하세요."
			/>
		</Container>
	);
};

export default PostContent;
