<script lang="ts">
	import { PUBLIC_LIVEKIT_SERVER_URL } from '$env/static/public';
	import { Room } from 'livekit-client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const room = new Room();

	onMount(async () => {
		let token = '';
		try {
			const tokenResponse = await fetch(
				`/api/livekit/token/generate/${data.userIsCreator ? 'creator' : 'viewer'}?roomname=${data.streamName}&creatorname=${data.user?.username}`
			);
			token = await tokenResponse.text();
		} catch (e) {
			console.error(e);
		}

		await room.connect(PUBLIC_LIVEKIT_SERVER_URL, token);

		await room.localParticipant.setMicrophoneEnabled(true);

		console.log(data.userIsCreator);
	});
</script>

<h1>{data.streamData.title}</h1>
<h2>{data.streamData.creator}'s Stream</h2>