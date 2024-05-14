import React, { Fragment, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";

const HomeInit = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isSidebarCollapsed) {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed",
        "sidebar-collapse"
      );
    } else {
      body.classList.add(
        "light-skin",
        "sidebar-mini",
        "theme-success",
        "fixed"
      );
    }
  }, []);
  return (
    <Fragment>
      <div className="content-wrapper">
        <div className="container-full">
          <NavigationBar
            isSidebarCollapsed={isSidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <SideBar />
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default HomeInit;
