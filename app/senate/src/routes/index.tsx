/** @format */

import { Routes, Route } from "react-router-dom";
import { renderRoutes } from "./renderRoutes";

export default function RouterView() {
  return (
    <Routes>
      {renderRoutes.map((route, index) => (
        <Route path={route.path} element={route.component} key={index} />
      ))}
    </Routes>
  );
}
