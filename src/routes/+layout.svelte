<script lang="ts">
	import '../app.pcss';

	import { setupIonicBase } from 'ionic-svelte';
	setupIonicBase();

	import '@fontsource/poppins';
	import '@fontsource-variable/gantari';
	import 'ionic-svelte/components/all';
	import '../theme/variables.css';

	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n, r } from '$lib/i18n';
	import { removeOldRuAndSid } from '$lib/preferences/sidRu';
	import HiddenLogsButton from '$lib/components/molecules/HiddenLogsButton.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { App } from '@capacitor/app';

	const controller = new AbortController();
	const signal = controller.signal;

	document.addEventListener(
		'deviceready',
		async function () {
			await removeOldRuAndSid();
		},
		false
	);
	onMount(() => {
		document.addEventListener(
			'ionBackButton',
			(ev: any) => {
				ev.detail.register(-1, () => {
					if (isExitPoint()) App.exitApp();
					else if (r('/unlock') === window.location.pathname) return;
					else window.history.back();
				});

				const isExitPoint = () => {
					const exitPoints = [r('/home'), r('/register-login')];
					return exitPoints.includes(window.location.pathname);
				};
			},
			{ signal }
		);
	});
	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
	/>
	<script
		type="module"
		src="https://cdn.jsdelivr.net/npm/@didroom/components@1.30.2/dist/didroom-components/didroom-components.esm.js"
	></script>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@didroom/components@1.30.2/dist/didroom-components/didroom-components.css"
	/>
</svelte:head>

<ParaglideJS {i18n}>
	<HiddenLogsButton />
	<ion-app>
		<slot />
	</ion-app>
</ParaglideJS>
