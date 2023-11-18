import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Layout from './components/layout/Layout';
import NewPost from './pages/newpost/NewPost';
import NotFound from './pages/not-found/NotFound';
import Feed from './pages/feed/Feed';
import { position } from 'stylis';

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<Main />
							</Layout>
						}
					/>
					<Route
						path="/archive"
						element={
							<Layout>
								<NewPost />
							</Layout>
						}
					/>
					<Route
						path="/editpost"
						element={
							<Layout>
								<NewPost />
							</Layout>
						}
					/>

					{/* 피드 페이지: 전체 피드 조회 */}
					<Route
						path="/feed"
						element={
							<Layout>
								<Feed />
							</Layout>
						}
					/>
					{/* 특정 유저 피드 조회 */}
					<Route
						path="/feed/:userId"
						element={
							<Layout>
								<Feed />
							</Layout>
						}
					/>
					{/* 특정 태그 피드 조회 */}
					<Route
						path="/feed/hashtags/:tag"
						element={
							<Layout>
								<Feed />
							</Layout>
						}
					/>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
