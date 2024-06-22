import { signInFormSchema, signUpFormSchema } from '$lib/zod/schema';
import { userTable } from '../../lib/server/db/schema/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash, verify } from '@node-rs/argon2';

import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/db/auth/lucia';
import { db } from '$lib/server/db/db';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	return {
		signUpForm: await superValidate(zod(signUpFormSchema)),
		signInForm: await superValidate(zod(signInFormSchema))
	};
};

export const actions: Actions = {
	signup: async (event) => {
		const signUpForm = await superValidate(event, zod(signUpFormSchema));
		if (!signUpForm.valid) {
			return fail(400, { signUpForm });
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(signUpForm.data.password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db.insert(userTable).values({
			id: userId,
			username: signUpForm.data.username,
			password: passwordHash
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	},

	signin: async (event) => {
		const signInForm = await superValidate(event, zod(signInFormSchema));
		if (!signInForm.valid) {
			return fail(400, { signInForm });
		}

		const existingUser = (
			await db
				.select()
				.from(userTable)
				.where(eq(userTable.username, signInForm.data.username.toLowerCase()))
		)[0];
		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}

		const validPassword = await verify(existingUser.password as string, signInForm.data.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return setError(signInForm, 'password', 'Incorrect username or password');
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
