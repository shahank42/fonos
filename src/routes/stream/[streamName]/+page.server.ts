import type { PageServerLoad } from "./$types";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db/db";
import { streamsTable } from "$lib/server/db/schema/stream";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (locals.user?.username === "") {
    // TODO: redirect user to /authorize if not signed in
    console.log("login pls")
    redirect(403, "/authorize")
  }

  const streamData = await db.select().from(streamsTable).where(eq(params.streamName, streamsTable.name))

  return {
    userIsCreator: streamData[0].creator === locals.user?.username,
    streamName: params.streamName,
    user: locals.user,
    streamData: streamData[0],
  };
};

