// RecentPages.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import userInfoApi from '../../api/userInfoApi';

//npm install jwt-decode
//npm install @types/jwt-decode --save-dev 설치필요

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(3, 1fr); // 3개의 행
	grid-gap: 5px;
	margin-bottom: 2rem;
	margin-top: 2rem;
	justify-content: center;
	align-content: start;
	overflow-y: auto; // 세로 스크롤을 위해 auto로 설정
	height: calc(
		100px * 3 + 10px * 2
	); // 이미지 높이 * 행 수 + (행 수 - 1) * grid-gap
`;

const Image = styled.img`
	width: 100%;
	object-fit: cover;
`;

interface ImageData {
	postId: number;
	mediaUrl: string;
	userId: number;
}

interface PostResponse {
	// API 응답 구조에 따라 필드를 조정해야 함
	postId: number;
	mediaUrls: string[];
	userId: number;
	// ...[다른 필요한 필드]
}

interface ImageData {
	postId: number;
	mediaUrl: string;
	userId: number;
}

const RecentPages = () => {
	const [images, setImages] = useState<ImageData[]>([]);

	useEffect(() => {
		const loadImages = async () => {
			try {
				const nickName = await userInfoApi.fetchUserNickName();
				const userPosts = await userInfoApi.fetchUserPosts(nickName);
				setImages(userPosts);
			} catch (error) {
				console.error('Error loading images:', error);
			}
		};

		loadImages();
	}, []);
	return (
		<GridContainer>
			{images.map((img) => (
				// <Link key={img.postId} to={`/feed/${img.postId}`}>
				<Link key={img.postId} to={`/editpost/${img.postId}`}>
					<Image src={img.mediaUrl} alt={`Post ${img.postId}`} />
				</Link>
			))}
		</GridContainer>
	);
};

export default RecentPages;
