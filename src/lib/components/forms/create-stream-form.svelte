<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { createStreamFormSchema, type CreateStreamFormSchema } from '../../zod/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<CreateStreamFormSchema>>;

	const createStreamForm = superForm(data, {
		validators: zodClient(createStreamFormSchema)
	});

	const { form: createStreamFormData, enhance } = createStreamForm;
</script>

<form method="post" action="?/newstream" use:enhance>
	<Form.Field form={createStreamForm} name="streamTitle">
		<Form.Control let:attrs>
			<Form.Label>Stream Title</Form.Label>
			<Input {...attrs} bind:value={$createStreamFormData.streamTitle} />
		</Form.Control>
		<Form.Description>Enter a cool and catchy title for your stream.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field form={createStreamForm} name="streamDescription">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Input {...attrs} bind:value={$createStreamFormData.streamDescription} />
		</Form.Control>
		<Form.Description></Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Go Live!</Form.Button>
</form>
