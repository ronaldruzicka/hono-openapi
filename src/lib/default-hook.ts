import type { Hook } from "@hono/zod-openapi";
import type { AppEnv } from "./create-app";

import { UNPROCESSABLE_ENTITY } from "@/constants/http-status";

// biome-ignore lint/suspicious/noExplicitAny: I cannot use unknown for the path generic
export const defaultHook: Hook<unknown, AppEnv, any, unknown> = (
  result,
  ctx
) => {
  if (!result.success) {
    return ctx.json(
      {
        success: result.success,
        error: {
          name: result.error.name,
          issues: result.error.issues,
        },
      },
      UNPROCESSABLE_ENTITY.code
    );
  }
};
