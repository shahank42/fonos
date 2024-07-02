<script lang="ts">
	import type { Room } from 'livekit-client';
	import { Button } from './ui/button';
	import { cn } from '$lib/utils';

	let { room }: { room: Room } = $props();

	let listening = $state(false);
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex w-full gap-2">
		<span class="font-bold"> Status: </span>
		{#if listening}
			<span class="text-green-400">Listening</span>
		{:else}
			<span class="text-red-500">Not Listening</span>
		{/if}
	</div>

	<Button
		variant="outline"
		onclick={() => {
			room.startAudio();
			listening = true;
		}}
		disabled={listening}
	>
		Click to listen
	</Button>
</div>
