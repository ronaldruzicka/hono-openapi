import type { IncomingMessage, ServerResponse } from "node:http";
import type { Logger } from "pino";

import { OpenAPIHono } from "@hono/zod-openapi";

import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";

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

export function createApp() {
  const app = new OpenAPIHono<AppEnv>();

  // Attach a per-request logger enriched with the request id
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);
}
