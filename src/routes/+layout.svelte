<script lang="ts">
	import '../app.pcss';

	import { setupIonicBase } from 'ionic-svelte';
	setupIonicBase();

	import '@fontsource/poppins';
	import '@fontsource-variable/gantari';
	import 'ionic-svelte/components/all';
	import '../theme/variables.css';

	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n } from '$lib/i18n';
	import { removeOldRuAndSid } from '$lib/preferences/sidRu';

	document.addEventListener(
		'deviceready',
		async function () {
			await removeOldRuAndSid();
		},
		false
	);
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
	/>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@didroom/components@1.15.3/dist/didroom-components/didroom-components.esm.js"
	></script>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@didroom/components@1.15.3/dist/didroom-components/didroom-components.css"
	/>
</svelte:head>

<ParaglideJS {i18n}>
	<ion-app>
		<slot />
	</ion-app>
</ParaglideJS>
