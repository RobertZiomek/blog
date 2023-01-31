import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be a string",
      required_error: "Username is required",
    })
    .trim()
    .min(3, "Username must have at least 3 characters"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .trim()
    .min(3, "Password must have at least 3 characters"),
});

export type RegisterValues = z.infer<typeof registerSchema>;
