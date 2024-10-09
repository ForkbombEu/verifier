<script lang="ts">
	import { Form, createForm, Checkbox, Input } from '$lib/components/forms';
	import { goto, m } from '$lib/i18n';
	import { z } from 'zod';
	import background from '$lib/assets/bg-4.svg';
	import { login } from '$lib/slangroom/login';
	import type { Feedback } from '$lib/utils/types.js';
	import { version } from '$app/environment';

	let feedback: Feedback = {};

	let scrollBox:HTMLElement

	//
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
		conditions: z.literal(true, {
			message: m.You_must_accept_the_terms_and_conditions_to_continue()
		}),
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
				scrollBox.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	});
</script>

<div class="flex h-screen flex-col place-content-between overflow-y-scroll" >
	<d-feedback {...feedback} />
	<div class="grow" bind:this={scrollBox}>
		<d-background-illustration {background}>
			<d-illustration illustration="pidgeon"> </d-illustration></d-background-illustration
		>
		<div>
			<div class="flex flex-col">
				<div class="flex w-full flex-col items-center gap-4 px-8">
					<div class="flex w-full flex-col gap-2 pt-8">
						<d-heading sixe="s">Enter your email</d-heading>
						<d-text size="l">Enter your email to get started.</d-text>
					</div>

					<Form {form} formClass="flex flex-col gap-4 pb-6 pt-4 w-full">
						<Input {form} fieldPath="email" placeholder={'email@domain.org'} label={'email'} />
						<Input
							{form}
							fieldPath="password"
							type="password"
							placeholder={'password'}
							label={'password'}
							hidable
						/>
						<Checkbox fieldPath="conditions" {form}
							>{m.Accept()}
							<a
								href="https://didroom.com/guides/7_terms-and-conditions/"
								class="text-accent underline"
							>
								{m.Terms_and_Conditions()}
							</a></Checkbox
						>
						<d-button size="default" color="accent" type="submit" expand class="mt-4">
							{'Login'}
						</d-button>
					</Form>
				</div>
			</div>
		</div>
	</div>
	<d-app-details developedBy={m.Developed_by_Forkbomb()} {version} />
</div>
