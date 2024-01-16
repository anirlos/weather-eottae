// eslint-disable-next-line @typescript-eslint/naming-convention
import React from 'react';
import git from '../../assets/footer/GitHub-logo.png';
import notion from '../../assets/footer/Notion-logo.svg.png';
import { FooterWrap, FooterContent } from './FooterStyles'; // 스타일 파일에서 가져옵니다.

const Footer: React.FC = () => {
	return (
		<footer>
			<FooterWrap>
				<FooterContent>
					<address>
						상호명 및 호스팅 서비스 제공 : 날씨어때?(주)
						<br />
						대표이사 : 슈퍼코딩
						<br />
						통신판매업신고 : 2023-슈퍼코딩-1021
						<br />
						<a href="#">사업자정보 확인 &gt;</a>
					</address>
					<div className="contact-info">
						<a href="#">
							<img id="git" src={git} alt="git" />
						</a>
						<a href="#">
							<img id="notion" src={notion} alt="notion" />
						</a>
					</div>
				</FooterContent>
			</FooterWrap>
		</footer>
	);
};

export default Footer;
