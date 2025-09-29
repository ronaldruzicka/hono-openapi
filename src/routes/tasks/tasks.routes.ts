import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { HttpStatus } from "@/constants/http-status";
import { jsonContent } from "@/lib/open-api/json-content";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatus.OK.code]: jsonContent({
      description: "List all tasks",
      schema: z.array(z.object({ completed: z.boolean(), title: z.string() })),
    }),
  },
});

export type ListRoute = typeof list;
