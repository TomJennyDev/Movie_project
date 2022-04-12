import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import VideoModal from "../components/VideoModal";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import SearchPage from "../pages/SearchPage";

function Router() {
  let location = useLocation();
  let state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/modal/:id" element={<VideoModal />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
