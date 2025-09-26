import z from "zod";

const DEFAULT_PORT = 9999;

// biome-ignore-start lint/style/useNamingConvention: Env variables are typically capitalized
export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(DEFAULT_PORT),
});

// biome-ignore-end lint/style/useNamingConvention: Env variables are typically capitalized

export type Env = z.infer<typeof EnvSchema>;

function getEnv(): Env {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(z.prettifyError(parsed.error));
    process.exit(1);
  }

  return parsed.data;
}

export const env = getEnv();
