import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
}

export default MainLayout;
