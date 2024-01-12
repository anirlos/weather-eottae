//UserInfo.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import userInfoApi from '../../api/userInfoApi';
import AddressSelect from './AddressSelect'; // 주소 선택 컴포넌트
import {
	Header,
	TopSection,
	BottomSection,
	ProfileImagePreview,
	CustomFileInput,
	ModalBackground,
	ModalContainer,
	Form,
	Label,
	Input,
	InputWrapper,
	Button,
	ButtonGroup,
} from './UserInfoStyles';

interface UserInfoProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (
		newProfileImage: string,
		newNickname: string,
		newStatusMessage: string
	) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ isOpen, onClose, onSave }) => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [nickName, setNickName] = useState('');
	const [message, setMessage] = useState('');
	const [address, setAddress] = useState<string>('');
	const [imageUrl, setImageUrl] = useState('/person-circle.svg');
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [nicknameError, setNicknameError] = useState(false);
	const [messageError, setMessageError] = useState(false);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const userInfo = await userInfoApi.fetchUserInfo();
				setName(userInfo.name || '');
				setEmail(userInfo.email || '');
				setNickName(userInfo.nickName || '');
				setMessage(userInfo.message || '');
				setAddress(userInfo.address || '');
				setImageUrl(userInfo.imageUrl || '/person-circle.svg');
			} catch (error) {
				console.error('UserInfo 가져오기 실패', error);
			}
		};

		fetchUserInfo();
	}, []);

	// 이미지 업로드 핸들러
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files![0];
		if (file) {
			setUploadedImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	//닉네임 제한
	const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNickName(e.target.value);
		setNicknameError(e.target.value.length > 10);
	};

	const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
		setMessageError(e.target.value.length > 30);
	};
	const handleAddressChange = (selectedAddress: string) => {
		setAddress(selectedAddress);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (nicknameError || messageError) {
			alert('닉네임 또는 메시지의 길이를 확인해주세요.');
			return;
		}

		const userInfoData = {
			nickName,
			email,
			address,
			message,
		};

		try {
			if (uploadedImage instanceof File) {
			}

			await userInfoApi.updateUserInfo(userInfoData, uploadedImage);
			onSave(imageUrl, nickName, message);
			onClose();
		} catch (error) {
			console.error('사용자 정보 업데이트 실패', error);
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<ModalBackground>
			<ModalContainer>
				<TopSection>
					<Header>프로필 수정</Header>
					{imageUrl && (
						<ProfileImagePreview src={imageUrl} alt="Profile Preview" />
					)}
					<CustomFileInput htmlFor="profileImageInput">
						변경
						<input
							id="profileImageInput"
							type="file"
							onChange={handleImageChange}
						/>
					</CustomFileInput>
				</TopSection>
				<BottomSection>
					<Form onSubmit={handleSubmit}>
						<InputWrapper>
							<Label htmlFor="name">이름</Label>
							<Input type="text" id="name" value={name} readOnly />
						</InputWrapper>
						<InputWrapper>
							<Label htmlFor="email">이메일</Label>
							<Input type="email" id="email" value={email} readOnly />
						</InputWrapper>

						<AddressSelect
							initialAddress={address}
							onAddressSelectChange={handleAddressChange}
						/>

						<InputWrapper>
							<Label htmlFor="nickName">닉네임</Label>
							<Input
								type="text"
								id="nickName"
								value={nickName}
								onChange={handleNicknameChange}
								maxLength={10}
							/>
							{nicknameError && (
								<span style={{ color: 'red', fontSize: '12px' }}>
									닉네임은 10글자 이내로 작성해주세요.
								</span>
							)}
						</InputWrapper>

						<InputWrapper>
							<Label htmlFor="message">메시지</Label>
							<Input
								type="text"
								id="message"
								value={message}
								onChange={handleMessageChange}
								maxLength={31}
							/>
							{messageError && (
								<span style={{ color: 'red', fontSize: '12px' }}>
									메시지는 30글자 이내로 작성해주세요.
								</span>
							)}
						</InputWrapper>
						<ButtonGroup>
							<Button type="submit">수정</Button>
							<Button type="button" onClick={onClose}>
								닫기
							</Button>
						</ButtonGroup>
					</Form>
				</BottomSection>
			</ModalContainer>
		</ModalBackground>
	);
};

export default UserInfo;
