import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/main/MainLayout';
import Layout from './components/layout/Layout';
import NewPost from './pages/newpost/NewPost';

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
				</Routes>
			</Router>
		</div>
	);
};

export default App;
