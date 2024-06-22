<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { enhance } from '$app/forms';

	export let data;
</script>

<h1>Welcome to fonos</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !data.user}
	<p>You are not signed in</p>
	<a href="/auth/sign-in">Sign In</a>
{:else}
	<p>Hi, {data.user.username}!</p>
	<form method="post" use:enhance>
		<button>Sign out</button>
	</form>
{/if}
