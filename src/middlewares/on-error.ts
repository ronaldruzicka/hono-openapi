import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { INTERNAL_SERVER_ERROR, OK } from "@/constants/http-status";
import { env } from "@/env";

export const onError: ErrorHandler = (err, context) => {
  const currentStatus =
    "status" in err ? err.status : context.newResponse(null).status;

  const statusCode =
    currentStatus !== OK.code
      ? (currentStatus as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR.code;

  const environment = context.env?.NODE_ENV || env.NODE_ENV;

  return context.json(
    {
      message: err.message,
      stack: environment === "production" ? undefined : err.stack,
    },
    statusCode
  );
};
