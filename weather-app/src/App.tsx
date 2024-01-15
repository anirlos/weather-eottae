import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatView from "./pages/Chat/ChatView";
import Main from "./pages/main/Main";
import NewPost from "./pages/newpost/NewPost";
import NotFound from "./pages/not-found/NotFound";
import Feed from "./pages/feed/Feed";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/users/MyPage";
import EditPost from "./pages/editpost/EditPost";
import { LogOutAction } from "./components/login/Logout";

const App: React.FC = () => {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<LogOutAction />} />

          <Route path="/archive" element={<NewPost />} />
          <Route path="/editpost/:postId" element={<EditPost />} />

          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:nickName" element={<Feed />} />
          <Route path="/feed/hashtags/:tag" element={<Feed />} />

          <Route path="/chat" element={<ChatView />} />

          <Route path="/user" element={<MyPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
