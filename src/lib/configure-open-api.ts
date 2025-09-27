import type { OpenAPIHono } from "@hono/zod-openapi";
import type { AppEnv } from "./create-app";

import { Scalar } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json" with { type: "json" };

export type OpenAPI = OpenAPIHono<AppEnv>;

export function configureOpenAPI(app: OpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Hono OpenAPI Example",
      description: "An example of using Hono with OpenAPI and Zod",
    },
  });

  app.get(
    "/reference",
    Scalar({
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "node",
      },
      theme: "kepler",
      url: "/doc",
    })
  );
}
