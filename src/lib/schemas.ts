import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organization: z.string().min(1, "Organization is required"),
  role: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
