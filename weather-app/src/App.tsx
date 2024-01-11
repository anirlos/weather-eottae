import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollTop from "./hooks/useScrollTop";
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
import WeatherInfo from "./pages/main/WeatherInfo";
import SevenWeatherForecast from "./pages/main/SevenWeatherForecast";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <ScrollTop />
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

          <Route path="/weatherinfo" element={<WeatherInfo />} />
          <Route path="/sevendayweather" element={<SevenWeatherForecast />} />
          {/* 날씨api 테스트용 페이지 */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
