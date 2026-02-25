import z from "zod";

const string = z.string();

export const registerSchema = z
  .object({
    name: string.min(1, "Name is required").min(3),
    email: string.min(1, "Email is required").email(),
    password: string.min(1, "Password is required").min(6),
    rePassword: string.min(1, "rePassword is required").min(6),
    phone: string.min(1, "Phone is required").min(10),
  })
  .refine(
    (data) => data.password === data.rePassword,
    { message: "Passwords do not match", path: ["rePassword"] }
  );

export const loginSchema = z.object({
  email: string.min(1, "Email is required").email(),
  password: string.min(1, "Password is required").min(6),
});
