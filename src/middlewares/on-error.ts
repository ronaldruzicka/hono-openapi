import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { HttpStatus } from "@/constants/http-status";
import { env } from "@/env";

export const onError: ErrorHandler = (err, context) => {
  const currentStatus =
    "status" in err ? err.status : context.newResponse(null).status;

  const statusCode =
    currentStatus !== HttpStatus.OK.code
      ? (currentStatus as ContentfulStatusCode)
      : HttpStatus.INTERNAL_SERVER_ERROR.code;

  const environment = context.env?.NODE_ENV || env.NODE_ENV;

  return context.json(
    {
      message: err.message,
      stack: environment === "production" ? undefined : err.stack,
    },
    statusCode
  );
};
