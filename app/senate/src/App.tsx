/** @format */
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import { renderRoutes } from "./routes/renderRoutes";
import RouterView from "./routes";
import { Menu } from "antd";

function App() {
  return (
    <Router>
      <div className="menuContainer">
        <Menu
          items={renderRoutes.map((route, key) => ({
            key,
            label: <Link to={route.path}>{route.meta.title}</Link>,
          }))}
        />
      </div>
      <div className="appContent">
        <RouterView />
      </div>
    </Router>
  );
}

export default App;
