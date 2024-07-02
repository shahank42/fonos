<script lang="ts">
	import { PUBLIC_LIVEKIT_SERVER_URL } from '$env/static/public';
	import { Room, RoomEvent } from 'livekit-client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import ChatComponent from '$lib/components/chat-component.svelte';
	import { sendMessage, setupChat, type ReceivedChatMessage } from '@livekit/components-core';

	export let data: PageData;
	const room = new Room();
	const chatService = setupChat(room, { channelTopic: data.streamData.title });

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

		if (data.userIsCreator) await room.localParticipant.setMicrophoneEnabled(true);

		console.log(data.userIsCreator);
	});

	room.on(RoomEvent.TrackSubscribed, (track) => {
		const element = track.attach();
		document.getElementById('audio-div')?.appendChild(element);
	});
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{data.streamData.title}</Card.Title>
		<Card.Description>{data.streamData.description}</Card.Description>
	</Card.Header>
</Card.Root>

{#if data.userIsCreator}
	<p>You are live!</p>
	<p>Share this url to another user to let them tune in</p>
{/if}

{#if !data.userIsCreator}
	<Button
		onclick={() => {
			room.startAudio();
		}}>Tune in to {data.streamData.creator}'s stream!</Button
	>
{/if}

<ChatComponent {chatService} />

<div class="" id="audio-div"></div>
