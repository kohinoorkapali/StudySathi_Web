import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .regex(/^[\w.-]+@gmail\.com$/, "Email must be a valid Gmail address")
    .max(50, "Email cannot exceed 50 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
    ),
});
