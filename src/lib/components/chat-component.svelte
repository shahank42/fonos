<script lang="ts">
	import { type ReceivedChatMessage, setupChat } from '@livekit/components-core';
	import { Participant, Room } from 'livekit-client';
	import Input from './ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from './ui/button';
	import IcRoundSend from './icons/IcRoundSend.svelte';
	import { Separator } from './ui/separator';
	import { cn } from '$lib/utils';
	import type { PageData } from '../../routes/stream/[streamName]/$types';

	let { chatService, data }: { chatService: ReturnType<typeof setupChat>; data: PageData } =
		$props();

	let messages = $state<ReceivedChatMessage[]>([] as ReceivedChatMessage[]);
	let currentMessage = $state<string>('');

	chatService.messageObservable.subscribe((_messages) => {
		messages = _messages;
	});

	let messageInput = $state<HTMLInputElement | null>(null);

	let messageScrollNode = $state<HTMLElement | null>(null);
	$effect(() => {
		if (messageScrollNode)
			if (messages)
				messageScrollNode.scroll({ top: messageScrollNode.scrollHeight, behavior: 'smooth' });
	});
</script>

<div class="flex h-full flex-col overflow-y-scroll" bind:this={messageScrollNode}>
	<div class="flex flex-1 flex-col"></div>
	<div class="flex flex-col">
		{#each messages as message}
			{#if message.from}
				<div
					class={cn('flex items-baseline gap-2.5 px-4 py-[1px]', {
						'bg-secondary text-secondary-foreground': message.from.identity === data.user.username
					})}
				>
					<span class="text-secondary-foreground">
						{message.from.identity}:
					</span>
					<span class="flex flex-wrap break-all leading-tight">
						{message.message}
					</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<Card.Root class="">
	<Card.Header>
		<Card.Description class="text-sm">Live chat - remember to be respectful!</Card.Description>
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
				class={cn('h-10 rounded-bl-full rounded-tl-full px-4', {
					'rounded-br-full rounded-tr-full': currentMessage === ''
				})}
			/>
			{#if currentMessage !== ''}
				<Button size="icon" class="size-10 rounded-br-full rounded-tr-full" type="submit">
					<IcRoundSend class="size-6" />
				</Button>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
