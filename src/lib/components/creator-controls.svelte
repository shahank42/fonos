<script lang="ts">
	import type { RemoteParticipant, Room } from 'livekit-client';
	import { Button } from './ui/button';
	import { Toggle } from './ui/toggle';
	import IcRoundMic from './icons/IcRoundMic.svelte';
	import IcRoundStopCircle from './icons/IcRoundStopCircle.svelte';
	import IcSharpQueue from './icons/IcSharpQueue.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Sheet from '$lib/components/ui/sheet';
	import IcSharpPeopleAlt from './icons/IcSharpPeopleAlt.svelte';
	import IcBaselineShare from './icons/IcBaselineShare.svelte';
	import ShareButton from './ui/share-button.svelte';
	import ParticipantsList from './participants-list.svelte';
	import { page } from '$app/stores';
	import IcRoundMicOff from './icons/IcRoundMicOff.svelte';
	import { toast } from 'svelte-sonner';

	let { room, participantsList }: { room: Room; participantsList: RemoteParticipant[] } = $props();

	let micEnabled = $state(true);
</script>

<div class="flex w-full justify-between justify-items-center">
	<div class="flex gap-3">
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button
					class="text-md flex h-12 gap-1 justify-self-start rounded-xl"
					variant="default"
					size="sm"
					builders={[builder]}
				>
					<IcSharpPeopleAlt class="size-8" />
					({participantsList.length})
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="flex flex-col gap-10">
				<Sheet.Header>
					<Sheet.Title>Audience Members</Sheet.Title>
					<Sheet.Description>See who's listening in on the stream</Sheet.Description>
				</Sheet.Header>
				<ParticipantsList {participantsList} />
			</Sheet.Content>
		</Sheet.Root>
		<Drawer.Root shouldScaleBackground>
			<Drawer.Trigger asChild let:builder>
				<Button
					class="size-12 justify-self-end rounded-xl"
					builders={[builder]}
					variant="outline"
					size="icon"
				>
					<IcSharpQueue class="size-8" />
				</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Audio Queue</Drawer.Title>
					<Drawer.Description class="text-balance">
						Select the sequence of audio to be played during the stream.
					</Drawer.Description>
				</Drawer.Header>
				<Drawer.Footer>
					<span class="w-full text-center text-muted-foreground">Feature coming soon!</span>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>

	<div class="flex gap-3">
		<Toggle
			class="size-12 rounded-xl"
			variant="outline"
			bind:pressed={micEnabled}
			on:click={async () => {
				micEnabled = !micEnabled;
				await room.localParticipant.setMicrophoneEnabled(micEnabled);
				toast.info(`Microphone ${micEnabled ? 'enabled' : 'disabled'}`)
			}}>
			{#if micEnabled}
				<IcRoundMic class="size-8" />
			{:else}
				<IcRoundMicOff class="size-8" />
			{/if}
			</Toggle
		>
		<Button class="size-12 rounded-xl" variant="destructive" size="icon">
			<IcRoundStopCircle class="size-8" />
		</Button>
		<ShareButton url={$page.url.href} title="Example Stream" />
	</div>
</div>
