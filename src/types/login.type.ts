import { loginSchema } from "@/schemas/auth.schemas";
import z from "zod";

export type LoginType = z.infer<typeof loginSchema>;