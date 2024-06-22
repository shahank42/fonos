<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { signUpFormSchema, type SignUpFormSchema } from '../../zod/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<SignUpFormSchema>>;

	const signUpForm = superForm(data, {
		validators: zodClient(signUpFormSchema)
	});

	const { form: signUpFormData, enhance } = signUpForm;
</script>

<form method="post" action="?/signup" use:enhance>
	<Form.Field form={signUpForm} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$signUpFormData.username} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={signUpForm} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$signUpFormData.password} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={signUpForm} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Passowrd</Form.Label>
			<Input {...attrs} bind:value={$signUpFormData.confirmPassword} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Sign Up!</Form.Button>
</form>

