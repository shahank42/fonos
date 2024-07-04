<script lang="ts">
	import type { Room } from 'livekit-client';
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

	let { room }: { room: Room } = $props();
</script>

<div class="grid w-full grid-cols-3 justify-between justify-items-center">
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button
				class="size-12 justify-self-start rounded-xl"
				variant="default"
				size="icon"
				builders={[builder]}
			>
				<IcSharpPeopleAlt class="size-8" />
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left">
			<Sheet.Header>
				<Sheet.Title>Audience Members</Sheet.Title>
				<Sheet.Description>See who's listening in on the stream</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>

	<div class="flex gap-3">
		<Toggle class="size-12 rounded-xl" variant="outline"><IcRoundMic class="size-8" /></Toggle>
		<Button class="size-12 rounded-xl" variant="destructive" size="icon">
			<IcRoundStopCircle class="size-8" />
		</Button>
		<ShareButton url="https://example.com" title="Example Stream" />
	</div>

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
				<Drawer.Description
					>Select the sequence of audio to be played during the stream.</Drawer.Description
				>
			</Drawer.Header>
			<Drawer.Footer></Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</div>
