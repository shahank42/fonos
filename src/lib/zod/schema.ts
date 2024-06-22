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

export const signInFormSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'Username should be longer than 3 characters' })
			.max(31, { message: 'Username should be shorter than 31 characters' }),
		password: z
			.string()
			.min(6, { message: 'Password should be longer than 6 characters' })
			.max(255, { message: 'Password should be shorter than 255 characters' }),
	})

export type SignInFormSchema = typeof signInFormSchema;
