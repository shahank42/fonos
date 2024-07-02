<script lang="ts">
	import { type ReceivedChatMessage, setupChat } from '@livekit/components-core';
	import { Participant, Room } from 'livekit-client';
	import Input from './ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from './ui/button';
	import IcRoundSend from './icons/IcRoundSend.svelte';
	import { Separator } from './ui/separator';

	let { chatService }: { chatService: ReturnType<typeof setupChat> } = $props();

	let messages = $state<ReceivedChatMessage[]>([] as ReceivedChatMessage[]);
	let currentMessage = $state<string>('');

	chatService.messageObservable.subscribe((_messages) => {
		messages = _messages;
	});

	let messageScrollNode = $state<HTMLElement | null>(null);
	$effect(() => {
		if (messageScrollNode)
			if (messages)
				messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
	});
</script>

<div class="flex h-full flex-col overflow-y-scroll bg-secondary text-secondary-foreground" bind:this={messageScrollNode}>
	<div class="flex flex-1 flex-col"></div>
	{#each messages as message}
		{#if message.from}
			<div class="text-lg mb-1 flex items-baseline gap-2 px-4 py-0.5">
				<span class="font-bold">
					{message.from.identity}:
				</span>
				<span class="flex flex-wrap break-all leading-tight">
					{message.message}
				</span>
			</div>
		{/if}
	{/each}
</div>

<Card.Root class="">
	<Card.Header>
		<Card.Description class="">Live chat - remember to be respectful!</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			class="flex w-full items-center justify-center"
			onsubmit={(e) => {
				e.preventDefault();
				if (currentMessage === '') return;
				chatService.send(currentMessage);
				currentMessage = '';
			}}
		>
			<Input
				type="text"
				placeholder="Enter Message..."
				bind:value={currentMessage}
				class="h-14 text-lg bg-secondary text-secondary-foreground"
			/>
			{#if currentMessage !== ''}
				<Button size="icon" class="size-14" type="submit">
					<IcRoundSend class="size-8" />
				</Button>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
