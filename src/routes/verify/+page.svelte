<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import { PushNotifications } from '@capacitor/push-notifications';
	//@ts-ignore
	import { Slangroom } from '@slangroom/core';
	//@ts-ignore
	import { qrcode } from '@slangroom/qrcode';
	import { onMount } from 'svelte';

	let qr: any;
	let error: string;

	const scriptCreate = `
Rule unknown ignore

Given I send text 'text' and create qr code and output into 'qrcode'
Given I have a 'string' named 'qrcode'
Then print data
`;
	const slangroom = new Slangroom(qrcode);

	const addListeners = async () => {
		await PushNotifications.addListener('registration', async (token) => {
			const text = JSON.stringify({
				url: 'http://localhost:3000',
				name: 'over18',
				issuedBy: 'ItGov',
				registrationToken: token.value
			});
			qr = await slangroom.execute(scriptCreate, {
				data: {
					text
				}
			});
		});

		await PushNotifications.addListener('registrationError', (err) => {
			error = err.error;
		});
	};

	const registerNotifications = async () => {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive === 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
	};
	onMount(async () => {
		await registerNotifications();
		await addListeners();
	});
	registerNotifications();
	addListeners();
</script>

<ion-header>
	<ion-toolbar>
		<ion-title>
			<div class="flex items-center gap-2">
				<Logo />
				<h1 class="text-2xl">Verifier</h1>
			</div>
		</ion-title>
	</ion-toolbar>
</ion-header>

<ion-content fullscreen class="ion-padding">
	<ion-button href="/">back</ion-button>
	{#if qr}
		<img src={qr.result.qrcode} alt="qrCode" class="w-full pt-20" />
	{/if}
</ion-content>
