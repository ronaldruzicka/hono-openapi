import { tasksRouter } from "./routes/tasks/tasks.index";

import { configureOpenAPI } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import { indexRouter } from "@/routes/index.route";

export const app = createApp();

const routes = [indexRouter, tasksRouter];

configureOpenAPI(app);

for (const route of routes) {
  app.route("/", route);
}
