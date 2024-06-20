import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutingConfig, LoginRoutingConfig } from "../config/routeConfig";
import Layout from "./Content";

const RouteComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialLoadRef = React.useRef(true);

  // useEffect(() => {
  //   if (initialLoadRef.current) {
  //     console.log("RouteComponent mounted");
  //     const accessToken = localStorage.getItem("Accesstoken");
  //     console.log("Access Token:::::", accessToken);
  //     if (accessToken && location.pathname === "/login") {
  //       navigate("/dashboard");
  //     } else if (!accessToken && location.pathname !== "/login") {
  //       navigate("/login");
  //     }
  //     initialLoadRef.current = false;
  //   }
  // }, [navigate, location.pathname]);

  return (
    <Routes>
      {LoginRoutingConfig.map((data, key) => (
        <Route key={key} path={data.path} element={data.component} />
      ))}
      {RoutingConfig.map((data, key) => (
        <Route key={key} path="/*" element={<Layout />}>
          <Route path={data.path} element={data.component} />
        </Route>
      ))}
    </Routes>
  );
};

export default RouteComponent;
