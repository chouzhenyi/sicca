/** @format */
import type { RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/Index.vue";
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/Index/home",
    meta: {
      title: "Root",
    },
  },
  {
    path: "/Index",
    name: "Index",
    redirect: "/Index/home",
    component: Layout,
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/Index/home",
        name: "Home",
        component: () => import("@/views/Index/Home.vue"),
      },
    ],
  },
  {
    path: "/Security",
    name: "Security",
    component: Layout,
    meta: {
      title: "证券",
    },
    redirect: "/Security/index",
    children: [
      {
        path: "/Security/index",
        name: "SecurityIndex",
        component: () => import("@/views/Security/index.vue"),
      },
    ],
  },
];
