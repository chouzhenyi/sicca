/** @format */

import Home from "/@/pages/home";
import Watermark from "/@/pages/watermark/index";
import Memo from "/@/pages/memo/index";

export const renderRoutes = [
  {
    path: "/",
    component: <Home />,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/watermark",
    component: <Watermark />,
    meta: {
      title: "水印",
    },
  },
  {
    path: "/memo",
    component: <Memo />,
    meta: {
      title: "react memo 函数",
    },
  },
];
