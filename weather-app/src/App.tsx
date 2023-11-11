import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/main/MainLayout';
import Layout from './components/layout/Layout';
import NewPost from './pages/newpost/NewPost';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

const App: React.FC = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<MainLayout />
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
				</Routes>
			</Router>
		</div>
	);
};

export default App;
