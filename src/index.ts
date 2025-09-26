import { serve } from "@hono/node-server";

import { app } from "./app";

import { env } from "@/env";

const DEFAULT_PORT = 3000;

serve(
  {
    fetch: app.fetch,
    port: env.PORT ? Number(env.PORT) : DEFAULT_PORT,
  },
  (info) => {
    // biome-ignore lint/suspicious/noConsole: to show where server is running
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
