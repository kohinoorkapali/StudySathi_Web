import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(25, "Full name cannot exceed 25 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username cannot exceed 25 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: z
      .string()
      .email("Enter a valid email")
      .regex(/^[\w.-]+@gmail\.com$/, "Email must be a valid Gmail address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
      ),

    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
