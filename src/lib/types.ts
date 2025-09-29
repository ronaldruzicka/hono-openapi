import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { AppEnv } from "./create-app";

export type AppRouteHandler<TConfig extends RouteConfig> = RouteHandler<
  TConfig,
  AppEnv
>;
