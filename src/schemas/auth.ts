import { z } from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  email: z.email(),
  role: z.enum(["user", "creator", "admin"]),
  created_at: z.string().optional(),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
});

export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
