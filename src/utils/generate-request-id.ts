import type { IncomingMessage, ServerResponse } from "node:http";
import type { ReqId } from "pino-http";
import { randomUUID } from "node:crypto";

export function generateRequestId(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
): ReqId {
  const existingId = req.id ?? req.headers["x-request-id"];

  if (existingId) {
    return existingId;
  }

  const id = randomUUID();

  res.setHeader("X-Request-Id", id);

  return id;
}
