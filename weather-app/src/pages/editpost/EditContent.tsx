import React from 'react';
import {
	ContentWrap,
	ContentTextarea,
	HashtagTextarea,
} from './EditContentstyles';

type EditContentProps = {
	content: string;
	setContent: (content: string) => void;
	hashtags: string;
	setHashtags: (hashtags: string) => void;
};

const EditContent: React.FC<EditContentProps> = ({
	content,
	setContent,
	hashtags,
	setHashtags,
}) => {
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleHashtagsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		let inputHashtags = e.target.value;
		if (inputHashtags && inputHashtags.charAt(0) !== '#') {
			inputHashtags = '#' + inputHashtags;
		}
		setHashtags(inputHashtags);
	};

	return (
		<ContentWrap>
			<label htmlFor="contentField">내용</label>
			<ContentTextarea
				id="contentField"
				value={content}
				onChange={handleContentChange}
				maxLength={300}
				placeholder=" 내용을 입력하세요."
			/>
			<label htmlFor="hashtagsField">해시태그</label>
			<HashtagTextarea
				id="hashtagsField"
				value={hashtags}
				onChange={handleHashtagsChange}
				maxLength={200}
				placeholder=" #해시태그를 입력하세요."
			/>
		</ContentWrap>
	);
};

export default EditContent;
