<script lang="ts">
	import { toast } from 'svelte-sonner';
	import IcBaselineShare from '../icons/IcBaselineShare.svelte';
	import IcRoundFileCopy from '../icons/IcRoundFileCopy.svelte';
	import { Button } from './button';

	let {
		url,
		title = url.split('/').at(-1)
	}: {
		/** URL to share. */
		url: string;

		/** Share message title. */
		title?: string;
	} = $props();

	let complete = $state(false);

	async function share() {
		const shareData: ShareData = { url, title };

		if (navigator.canShare && navigator.canShare(shareData)) {
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(url);
			complete = true;
			toast.info('Stream link copied to clipboard');
			setTimeout(() => {
				complete = false;
			}, 1500);
		}
	}
</script>

<Button onclick={share} class="size-12 rounded-xl" variant="outline" size="icon">
	{#if complete}
		<IcRoundFileCopy class="size-8" />
	{:else}
		<IcBaselineShare class="size-8" />
	{/if}
</Button>
