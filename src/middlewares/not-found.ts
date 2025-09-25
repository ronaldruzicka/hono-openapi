import type { NotFoundHandler } from "hono";

import { NOT_FOUND } from "@/constants/http-status";

export const notFound: NotFoundHandler = (context) =>
  context.json(
    {
      message: `${NOT_FOUND.message} - ${context.req.path}`,
    },
    NOT_FOUND.code
  );
