import { createStreamFormSchema } from './../../lib/zod/schema';
import { fail, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from '../$types';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { Room, RoomServiceClient } from 'livekit-server-sdk';
import { LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_SERVER_URL } from '$env/static/private';
import { db } from '$lib/server/db/db';
import { streamsTable } from '$lib/server/db/schema/stream';

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user,
    createStreamForm: await superValidate(zod(createStreamFormSchema))
  };
};

export const actions: Actions = {
  newstream: async (event) => {
    const createStreamForm = await superValidate(event, zod(createStreamFormSchema));
    if (!createStreamForm.valid) {
      return fail(400, { createStreamForm });
    }

    const streamName = crypto.randomUUID();

    await db.insert(streamsTable).values({
      name: streamName,
      title: createStreamForm.data.streamTitle,
      description: createStreamForm.data.streamDescription,
      creator: event.locals?.user?.username || ''
    });

    // const roomService = new RoomServiceClient(
    // 	LIVEKIT_SERVER_URL,
    // 	LIVEKIT_API_KEY,
    // 	LIVEKIT_API_SECRET
    // );

    // roomService.createRoom({
    // 	name: streamName,
    // }).then((room: Room) => {
    // 	console.log(`Created room ${streamName} for ${}`)
    // })

    redirect(302, `/stream/${streamName}`);
  }
};
