import type { IncomingMessage, ServerResponse } from "node:http";
import type { Logger } from "pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import pino from "pino";
import { pinoHttp } from "pino-http";
import pretty from "pino-pretty";

import { generateRequestId } from "./utils/generate-request-id";

import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";

// Extend Hono variable map to include our logger
type AppVariables = {
  logger: Logger;
};

type AppBindings = {
  incoming: IncomingMessage;
  outgoing: ServerResponse<IncomingMessage>;
};

type AppEnv = {
  // biome-ignore-start lint/style/useNamingConvention: Hono Env generic requires capitalized key name
  Variables: AppVariables;
  Bindings: AppBindings;
  // biome-ignore-end lint/style/useNamingConvention: Hono Env generic requires capitalized key name
};

const baseLogger = pino(
  process.env.NODE_ENV === "production" ? undefined : pretty()
);

const app = new OpenAPIHono<AppEnv>();

// Attach a per-request logger enriched with the request id
app.use(async (ctx, next) => {
  pinoHttp({
    logger: baseLogger,
    genReqId: generateRequestId,
  })(ctx.env.incoming, ctx.env.outgoing);

  ctx.set("logger", baseLogger);
  await next();
});

app.get("/", (ctx) => ctx.text("Hello Hono!"));

app.get("/error", (ctx) => {
  ctx.var.logger.info("Triggering test error");
  throw new Error("This is a test error");
});

app.notFound(notFound);
app.onError(onError);

export { app };
