import { serve } from "@hono/node-server";
import { app } from "./app";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    // biome-ignore lint/suspicious/noConsole: to show where server is running
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
