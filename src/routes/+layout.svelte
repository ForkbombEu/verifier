<script lang="ts">
	import '../app.pcss';

	import { setupIonicBase } from 'ionic-svelte';
	setupIonicBase();

	import '@fontsource/poppins';
	import '@fontsource-variable/gantari';
	import 'ionic-svelte/components/all';
	import '../theme/variables.css';

	import { ParaglideJS } from '@inlang/paraglide-js-adapter-sveltekit';
	import { i18n, r, m } from '$lib/i18n';
	import { removeOldRuAndSid } from '$lib/preferences/sidRu';
	import HiddenLogsButton from '$lib/components/molecules/HiddenLogsButton.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { App } from '@capacitor/app';
	import { Network } from '@capacitor/network';
	import FingerPrint from '$lib/assets/lottieFingerPrint/FingerPrint.svelte';
	import { refreshAuth } from '$lib/slangroom/login';

	const controller = new AbortController();
	const signal = controller.signal;

	document.addEventListener(
		'deviceready',
		async function () {
			await removeOldRuAndSid();
		},
		false
	);
	let isConnected: boolean;

	onMount(async () => {
		await refreshAuth();
		isConnected = (await Network.getStatus()).connected;
		Network.addListener('networkStatusChange', (status) => {
			isConnected = status.connected;
		});
		document.addEventListener(
			'ionBackButton',
			(ev: any) => {
				ev.detail.register(-1, () => {
					if (isExitPoint()) App.exitApp();
					else window.history.back();
				});

				const isExitPoint = () => {
					const exitPoints = [r('/home')];
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
	<script type="module" src="/components/didroom-components/didroom-components.esm.js"></script>
	<link rel="stylesheet" href="/components/didroom-components/didroom-components.css" />
	<!-- <script 
	 	type="module" 
	 	src="http://localhost:3333/build/didroom-components.esm.js" 
	 ></script> 
	 <link 
	 	rel="stylesheet" 
	 	href="http://localhost:3333/build/didroom-components.css" 
	 />  -->
</svelte:head>

<ParaglideJS {i18n}>
	<HiddenLogsButton />
	<ion-app>
		<div>
			<d-loading loading={!isConnected}>
				<FingerPrint />
				{#if !isConnected}
					<d-vertical-stack class="ion-padding" gap={8}>
						<d-text size="xl"
							>{m.It_seems_that_the_wallet_is_unable_to_connect_to_the_Internet_please_make_sure_your_internet_connection_is_working_and_retry()}</d-text
						>
						<d-button color="accent" on:click={() => App.exitApp()} aria-hidden expand
							>{m.Close()}</d-button
						>
					</d-vertical-stack>
				{/if}
			</d-loading>
			<slot />
		</div>
	</ion-app>
</ParaglideJS>
