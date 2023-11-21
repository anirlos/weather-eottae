import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatView from "./pages/Chat/ChatView";
import Main from "./pages/Main/Main";
import Layout from "./components/layout/Layout";
import NewPost from "./pages/newpost/NewPost";
import NotFound from "./pages/not-found/NotFound";
import Feed from "./pages/feed/Feed";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route
            path="/feed"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          <Route
            path="/feed/:userId"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          <Route
            path="/feed/hashtags/:tag"
            element={
              <Layout>
                <Feed />
              </Layout>
            }
          />
          <Route
            path="/chat"
            element={
              <Layout>
                <ChatView />
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
