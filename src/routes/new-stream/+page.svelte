<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import CreateStreamForm from '$lib/components/forms/create-stream-form.svelte';

	export let data;
</script>

<h1>Create your stream</h1>

{#if !data.user}
	<p>You are not signed in</p>
	<a href="/authorize">Sign In</a>
{:else}
	<Card.Root class="max-w-xl">
		<Card.Header>
			<Card.Title>New stream by {data.user.username}!</Card.Title>
		</Card.Header>
		<Card.Content>
			<CreateStreamForm data={data.createStreamForm} />
		</Card.Content>
	</Card.Root>
{/if}
