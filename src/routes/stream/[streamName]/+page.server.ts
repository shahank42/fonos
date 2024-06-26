import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { streamsTable } from '$lib/server/db/schema/stream';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) redirect(302, `/authorize?redirectTo=${url.pathname}`);

	const streamData = await db
		.select()
		.from(streamsTable)
		.where(eq(streamsTable.name, params.streamName));

	return {
		userIsCreator: streamData[0].creator === locals.user?.username,
		streamName: params.streamName,
		user: locals.user,
		streamData: streamData[0]
	};
};
