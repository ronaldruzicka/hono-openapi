import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

import { createRouter } from "@/lib/create-app";

export const tasksRouter = createRouter().openapi(routes.list, handlers.list);
