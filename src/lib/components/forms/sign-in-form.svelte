<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { signInFormSchema, type SignInFormSchema } from '../../zod/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SignInFormSchema>>;

	const signInForm = superForm(data, {
		validators: zodClient(signInFormSchema)
	});

	const { form: signInFormData, enhance } = signInForm;
</script>

<form method="post" action="?/signin" use:enhance>
	<Form.Field form={signInForm} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$signInFormData.username} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={signInForm} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$signInFormData.password} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Sign In!</Form.Button>
</form>

