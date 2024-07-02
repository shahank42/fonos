<script lang="ts">
	import { PUBLIC_LIVEKIT_SERVER_URL } from '$env/static/public';
	import { Room, RoomEvent } from 'livekit-client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import ChatComponent from '$lib/components/chat-component.svelte';
	import { sendMessage, setupChat, type ReceivedChatMessage } from '@livekit/components-core';
	import ListenerControls from '$lib/components/listener-controls.svelte';

	// export let data: PageData;
	let { data }: { data: PageData } = $props();

	const room = new Room();
	const chatService = setupChat(room, { channelTopic: data.streamData.title });

	let chatInterfaceHeightOffset = $state(0);

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

		// room.startAudio();
	});

	room.on(RoomEvent.TrackSubscribed, (track) => {
		const element = track.attach();
		document.getElementById('audio-div')?.appendChild(element);
	});
</script>

<div class="flex h-[100dvh] flex-col">
	<div bind:clientHeight={chatInterfaceHeightOffset} class="">
		<Card.Root class="">
			<Card.Header>
				<Card.Description class="font-semibold">@{data.streamData.creator}</Card.Description>
				<Card.Title class="text-2xl">{data.streamData.title}</Card.Title>
				{#if data.userIsCreator}
					<p>You are live!</p>
					<p>Share this url to another user to let them tune in</p>
				{/if}
				{#if !data.userIsCreator}
					<ListenerControls {room} />
				{/if}
			</Card.Header>

			<Accordion.Root>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="px-4">Description</Accordion.Trigger>
					<Accordion.Content>
						<Card.Content>
							<Card.Description>{data.streamData.description}</Card.Description>
						</Card.Content>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</Card.Root>
	</div>

	<div class="flex flex-col" style:height={`calc(100dvh - ${chatInterfaceHeightOffset}px)`}>
		<ChatComponent {chatService} />
	</div>

	<div class="" id="audio-div"></div>
</div>
