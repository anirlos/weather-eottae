import React, { ReactNode } from 'react';
import { Container, Wrap, MainWrap } from './LayoutStyles';
import { NavWrap } from '../nav/NavStyles';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';

interface LayoutProps {
	children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Container>
				<NavWrap>
					<Nav />
				</NavWrap>
				<Wrap>
					<MainWrap>{children}</MainWrap>
				</Wrap>
			</Container>
			<Footer />
		</>
	);
};

export default Layout;
