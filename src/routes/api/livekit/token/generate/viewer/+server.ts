import { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } from '$env/static/private';
import { AccessToken } from 'livekit-server-sdk';

export async function GET({ url }) {
  const roomName = url.searchParams.get('roomname') as string;
  const creatorName = url.searchParams.get('creatorname') as string;

  const apiKey = LIVEKIT_API_KEY;
  const apiSecret = LIVEKIT_API_SECRET;

  const at = new AccessToken(apiKey, apiSecret, { identity: creatorName });
  at.addGrant({ room: roomName, roomJoin: true, canPublish: false, canSubscribe: true });

  return new Response(await at.toJwt());
}
