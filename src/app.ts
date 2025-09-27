import { configureOpenAPI } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import { router } from "@/routes/index.route";

export const app = createApp();

const routes = [router];

configureOpenAPI(app);

for (const route of routes) {
  app.route("/", route);
}
