<script lang="ts">
	import AppDetails from '$lib/components/AppDetails.svelte';
	import Illustration from '$lib/components/molecules/Illustration.svelte';
	import { Form, createForm } from '$lib/components/forms';
	import { goto } from '$lib/i18n';
	import Input from '$lib/components/forms/input.svelte';
	import { z } from 'zod';
	import background from '$lib/assets/bg-4.svg';
	import { login } from '$lib/slangroom/login';
 	import type { Feedback } from '$lib/utils/types.js';


	let feedback: Feedback = {};

	//
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
		rememberEmail: z.boolean().optional()
	});

	const form = createForm({
		schema,
		onSubmit: async ({ form }) => {
			try {
			await login(form.data.email, form.data.password);
			await goto('/home');
			} catch (e) {
				console.error(e);
				feedback = {
					type: 'error',
					message: String(e),
					feedback: 'Failed to authenticate, maybe wrong email or password'
				};
			}
		}
	});
</script>

<div class="flex min-h-screen flex-col place-content-between">
	<d-feedback {...feedback} />
	<div class="grow">
		<Illustration img="pidgeon" {background} />
		<div>
			<div class="flex flex-col">
				<div class="flex w-full flex-col items-center gap-4 px-8">
					<div class="flex w-full flex-col gap-2 pt-8">
						<d-heading sixe="s">Enter your email</d-heading>
						<d-text size="l">Enter your email to get started.</d-text>
					</div>

					<Form {form} formClass="flex flex-col gap-4 pb-6 pt-4 w-full">
						<Input {form} fieldPath="email" placeholder={'email@domain.org'} label={'email'} />
						<Input {form} fieldPath="password" type="password" placeholder={'password'} label={'password'} />
						<d-button size="default" color="accent" type="submit" expand class="mt-4">
							{'Login'}
						</d-button>
					</Form>
				</div>
			</div>
		</div>
	</div>
	<AppDetails />
</div>
