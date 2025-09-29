import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = (ctx) => {
  const tasks = [{ completed: false, title: "Learn OpenAPI with Hono" }];

  return ctx.json(tasks);
};
