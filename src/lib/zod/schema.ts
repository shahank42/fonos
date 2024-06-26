import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username should be longer than 3 characters' })
      .max(31, { message: 'Username should be shorter than 31 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password should be longer than 6 characters' })
      .max(255, { message: 'Password should be shorter than 255 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type SignUpFormSchema = typeof signUpFormSchema;

export const signInFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should be longer than 3 characters' })
    .max(31, { message: 'Username should be shorter than 31 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password should be longer than 6 characters' })
    .max(255, { message: 'Password should be shorter than 255 characters' })
});

export type SignInFormSchema = typeof signInFormSchema;

export const createStreamFormSchema = z.object({
  streamTitle: z
    .string()
    .min(3, { message: 'Enter at least 3 characters for your stream title!' })
    .max(100, { message: 'Your stream title should be less than 100 characters' }),
  streamDescription: z
    .string()
    .min(3, 'Your stream description must be more than 3 characters!')
    .max(1000, 'Please keep your stream description under 1000 words')
});

export type CreateStreamFormSchema = typeof createStreamFormSchema;
