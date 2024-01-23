import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutSuccess, loginSuccess } from '../../redux/slice/authSlice';
import {
	Container,
	Wrap,
	TopWrap,
	HamburgerMenu,
	LogoWrap,
	NavWrap,
	LoginWrap,
} from './MobileNavStyles';
import logo from '../../assets/img/nav/logo.png';
import archive from '../../assets/img/nav/archive.png';
import weather from '../../assets/img/nav/weather.png';
import chat from '../../assets/img/nav/chat-square-text.png';
import clothing from '../../assets/img/nav/window-stack.png';
import user from '../../assets/img/nav/person-vcard.png';

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
}

const MobileNav: React.FC = () => {
	const navigate = useNavigate();
	const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const authState = useSelector((state: { auth: AuthState }) => state.auth);
	const { accessToken, refreshToken } = authState;
	const isLoggedIn = accessToken !== null && refreshToken !== null;

	const toggleNav = () => {
		setIsNavVisible(!isNavVisible);
	};

	const handleNavigation = (path: string) => {
		toggleNav();
		navigate(path);
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		const refreshToken = localStorage.getItem('refresh_token');
		if (accessToken && refreshToken) {
			dispatch(
				loginSuccess({
					access_token: accessToken,
					refresh_token: refreshToken,
				})
			);
		} else {
			dispatch(logoutSuccess());
		}
	}, [dispatch]);

	const onLogOut = () => {
		dispatch(logoutSuccess());
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		navigate('/');
		toggleNav();
	};

	return (
		<Container>
			<TopWrap>
				<HamburgerMenu onClick={toggleNav}>
					<div></div>
					<div></div>
					<div></div>
				</HamburgerMenu>
				<LogoWrap>
					<Link
						to={'/'}
						onClick={(e) => {
							e.preventDefault();
							handleNavigation('/');
						}}
					>
						<h1>
							<img src={logo} alt="Logo" />
						</h1>
					</Link>
				</LogoWrap>
			</TopWrap>
			{isNavVisible && (
				<Wrap isVisible={isNavVisible}>
					<NavWrap>
						<li>
							<Link
								to={'/'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/');
								}}
							>
								<span>
									<img src={weather} alt="오늘의날씨" />
									오늘의 날씨
								</span>
							</Link>
						</li>
						<li>
							<Link
								to={'/chat'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/chat');
								}}
							>
								<span>
									<img src={chat} alt="지역톡" />
									지역 톡
								</span>
							</Link>
						</li>
						<li>
							<Link
								to={'/feed'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/feed');
								}}
							>
								<span>
									<img src={clothing} alt="오늘뭐입지" />
									오늘 뭐 입지
								</span>
							</Link>
						</li>
						<li>
							<Link
								to={'/archive'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/archive');
								}}
							>
								<span>
									<img src={archive} alt="게시글등록" />
									게시글 등록
								</span>
							</Link>
						</li>
						<li>
							<Link
								to={'/user'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/user');
								}}
							>
								<span>
									<img src={user} alt="마이페이지" />
									마이 페이지
								</span>
							</Link>
						</li>
					</NavWrap>
					{isLoggedIn ? (
						<LoginWrap>
							<Link
								to={'/'}
								onClick={(e) => {
									e.preventDefault();
									onLogOut();
								}}
							>
								<p>로그아웃</p>
							</Link>
						</LoginWrap>
					) : (
						<LoginWrap>
							<Link
								to={'/login'}
								onClick={(e) => {
									e.preventDefault();
									handleNavigation('/login');
								}}
							>
								<p>로그인</p>
							</Link>
						</LoginWrap>
					)}
				</Wrap>
			)}
		</Container>
	);
};

export default MobileNav;
