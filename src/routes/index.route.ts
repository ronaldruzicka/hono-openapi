import { createRoute, z } from "@hono/zod-openapi";

import { HttpStatus } from "@/constants/http-status";
import { createRouter } from "@/lib/create-app";
import { jsonContent } from "@/lib/open-api/json-content";

export const indexRouter = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatus.OK.code]: jsonContent({
        description: "Tasks API index",
        schema: z.object({
          message: z.string(),
        }),
      }),
    },
  }),
  (ctx) => {
    return ctx.json({ message: "Hello, World!" });
  }
);
