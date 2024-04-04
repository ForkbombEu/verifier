<script>
	import AppDetails from '$lib/components/AppDetails.svelte';
	import { m, r } from '$lib/i18n';
</script>

<div class="flex h-screen flex-col place-content-between p-4 pt-32">
	<d-logo />
	<div class="flex flex-col gap-6">
		<d-button expand color="accent" href={r('/login?registration=true')}
			>Create an account</d-button
		>
		<d-button expand color="outline" href={r('/login')}>login</d-button>
	</div>
	<AppDetails />
</div>
