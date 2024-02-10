import { z } from "zod";

export const rawSchema = z.object({
  email: z
    .string()
    .email()
    .regex(/^[a-zA-Z]+_[a-zA-Z]{2}_\d{2}@([a-zA-Z]{2})\.nits\.ac\.in$/),
  scholarId: z.string().regex(/^(1[6-9]|[2-9][0-9])[0-9][1-6][0-1][0-9][0-9]$/),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(12, "Password cannot be more than 12 characters"),
  confirm: z.string(),
});

export const teamSchema = z.object({
  name: z.string(),
  scholarId: z.string().regex(/^(1[6-9]|[2-9][0-9])[0-9][1-6][0-1][0-9][0-9]$/),
  email: z.string().email(),
  reason: z.string(),
});

export type teamSchemaType = z.infer<typeof teamSchema>;

export const signUpFormSchema = rawSchema.refine(
  (data) => data.password === data.confirm,
  {
    message: "Passwords must match",
    path: ["confirm"],
  }
);

export const feedBackSchema = z.object({
  feedBack: z.string(),
  email: z.string().email(),
});

export const suggestionSchema = z.object({
  suggestion: z.string(),
  subCategory: z.string(),
  category: z.string(),
  usermail: z.string().email(),
});

export const subCategoryInput = z.object({ category: z.string() });
export const statsInput = z.object({
  subCategoryId: z.number(),
});
export const studentInput = z.object({
  email: z.string(),
});

export const loginFormSchema = z.object({
  unique: z.union([z.string(), z.number()]),
  password: z.string(),
});

export type signUpFormType = z.infer<typeof rawSchema>;
export type loginFormType = z.infer<typeof loginFormSchema>;

export const VoteSchema = z.object({
  value: z.string(),
});

export const ballotSchema = z.object({
  id: z.number(),
  subCategoryId: z.number(),
  email: z.string(),
});
export type VoteSchemaType = z.infer<typeof VoteSchema>;
