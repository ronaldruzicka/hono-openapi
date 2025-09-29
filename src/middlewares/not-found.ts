import type { NotFoundHandler } from "hono";

import { HttpStatus } from "@/constants/http-status";

export const notFound: NotFoundHandler = (context) =>
  context.json(
    {
      message: `${HttpStatus.NOT_FOUND.message} - ${context.req.path}`,
    },
    HttpStatus.NOT_FOUND.code
  );
