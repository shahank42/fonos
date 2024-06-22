<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	import SignUpForm from '$lib/components/forms/sign-up-form.svelte';
	import type { PageData } from './$types';
	import SignInForm from '$lib/components/forms/sign-in-form.svelte';

	export let data: PageData;
</script>

<Tabs.Root value="signup" class="max-w-xl">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
		<Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
	</Tabs.List>
	
	<Tabs.Content value="signup">
		<Card.Root class="max-w-xl">
			<Card.Header>
				<Card.Title>Sign Up</Card.Title>
			</Card.Header>
			<Card.Content>
				<SignUpForm data={data.form} />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>

	<Tabs.Content value="signin">
		<Card.Root class="max-w-xl">
			<Card.Header>
				<Card.Title>Sign In</Card.Title>
			</Card.Header>
			<Card.Content>
				<SignInForm data={data.form} />
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
