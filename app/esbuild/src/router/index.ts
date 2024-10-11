/** @format */

import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { App } from "vue";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory("/"),
  routes,
  strict: true,
});

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};
