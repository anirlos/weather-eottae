import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/main/MainLayout";
import Layout from "./components/layout/Layout";
import NewPost from "./pages/newpost/NewPost";
import NotFound from "./pages/not-found/NotFound";
import Feed from "./pages/feed/Feed";

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
