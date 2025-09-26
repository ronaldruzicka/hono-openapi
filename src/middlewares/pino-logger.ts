import type { Context } from "hono";
import type { Next } from "hono/types";

import pino from "pino";
import { pinoHttp } from "pino-http";
import pretty from "pino-pretty";

import { generateRequestId } from "@/utils/generate-request-id";

const baseLogger = pino(
  process.env.NODE_ENV === "production" ? undefined : pretty()
);

export function pinoLogger() {
  return async (ctx: Context, next: Next) => {
    pinoHttp({
      logger: baseLogger,
      genReqId: generateRequestId,
    })(ctx.env.incoming, ctx.env.outgoing);

    ctx.set("logger", baseLogger);
    await next();
  };
}
