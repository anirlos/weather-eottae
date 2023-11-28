import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatView from "./pages/Chat/ChatView";
import Main from "./pages/Main/Main";
import Layout from "./components/layout/Layout";
import NewPost from "./pages/newpost/NewPost";
import NotFound from "./pages/not-found/NotFound";
import Feed from "./pages/feed/Feed";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/users/MyPage";
import EditPost from "./pages/editpost/EditPost";
import WeatherInfo from "./pages/Main/WeatherInfo";

const App: React.FC = () => {
  const [location, setLocation] = useState({
    coordinates: { lat: "", lng: "" },
  });

  // 이 함수를 사용하여 현재 위치 정보를 업데이트합니다.
  const handleLocationUpdate = (newLocation: GeolocationCoordinates) => {
    setLocation({
      coordinates: {
        lat: newLocation.latitude.toString(),
        lng: newLocation.longitude.toString(),
      },
    });
  };

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
                <EditPost />
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
          <Route
            path="/chat"
            element={
              <Layout>
                <ChatView />
              </Layout>
            }
          />
          <Route
            path="/user"
            element={
              <Layout>
                <MyPage />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/weatherinfo" element={<WeatherInfo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
