<script lang="ts">
	import { type ReceivedChatMessage, setupChat } from '@livekit/components-core';
	import { Participant, Room } from 'livekit-client';
	import Input from './ui/input/input.svelte';
	import { Button } from './ui/button';

	let { chatService } = $props<{ chatService: ReturnType<typeof setupChat> }>();

	let messages = $state<ReceivedChatMessage[]>([] as ReceivedChatMessage[]);
	let currentMessage = $state<string>('');

	//@ts-ignore
	chatService.messageObservable.subscribe((_messages) => {
		messages = _messages;
	});
</script>

<form
	class="flex w-full max-w-sm items-center space-x-2"
	onsubmit={(e) => {
		e.preventDefault();
		chatService.send(currentMessage);
		currentMessage = '';
	}}
>
	<Input type="text" placeholder="Enter Message..." bind:value={currentMessage} />
	<Button type="submit">Send</Button>
</form>

{#each messages as message}
	{#if message.from}
		<p>{message.from.identity}: {message.message}</p>
	{/if}
{/each}
