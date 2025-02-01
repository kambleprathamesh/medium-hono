import z from "zod";

//Signup
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().length(6),
  name: z.string().optional(),
});

//Signin
export const signin = z.object({
  email: z.string().email(),
  password: z.string().length(6),
});

//create blog
export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
});

//update Blog
export const updateBlog = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type signupInput = z.infer<typeof signupInput>;
export type signin = z.infer<typeof signin>;
export type createBlog = z.infer<typeof createBlog>;
export type updateBlog = z.infer<typeof updateBlog>;
