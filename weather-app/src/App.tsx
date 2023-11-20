import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Layout from './components/layout/Layout';
import NewPost from './pages/newpost/NewPost';
<<<<<<< HEAD
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
=======
import NotFound from './pages/not-found/NotFound';
import Feed from './pages/feed/Feed';
import { position } from 'stylis';
>>>>>>> d2720e4b463fdf0caf0dec852dc5bb85dda37739

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
<<<<<<< HEAD
						path="/login"
						element={
							
								<Login />
							
								
						}
					/>
					<Route
						path="/signup"
						element={
								<Signup />
						}
					/>
=======
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
>>>>>>> d2720e4b463fdf0caf0dec852dc5bb85dda37739
				</Routes>
			</Router>
		</div>
	);
};

export default App;
