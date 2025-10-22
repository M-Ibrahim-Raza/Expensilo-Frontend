import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:8000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables.");
  throw new Error("Environment variable validation failed");
}

export const env = parsed.data;
