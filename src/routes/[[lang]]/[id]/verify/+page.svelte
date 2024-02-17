<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import { PushNotifications } from '@capacitor/push-notifications';
	//@ts-ignore
	import { Slangroom } from '@slangroom/core';
	//@ts-ignore
	import { qrcode } from '@slangroom/qrcode';
	import { onMount } from 'svelte';
	import { thumbsDownOutline, thumbsUpOutline } from 'ionicons/icons';
	import Header from '$lib/components/molecules/Header.svelte';
	import { m } from '$lib/i18n';

	export let data: any;

	let qr: any;
	let error: string;
	let tok: string;

	const scriptCreate = `
Rule unknown ignore

Given I send text 'text' and create qr code and output into 'qrcode'
Given I have a 'string' named 'qrcode'
Then print data
`;
	const slangroom = new Slangroom(qrcode);
	let incomingNotification: any;

	const addListeners = async () => {
		await PushNotifications.addListener('registration', async (token) => {
			tok = token.value;
			const text = JSON.stringify({
				url: 'http://192.168.1.36:3000/verify-credential',
				name: data.credential.name,
				issuedBy: data.credential.issuer,
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

		await PushNotifications.addListener('pushNotificationReceived', (notification) => {
			incomingNotification = notification;
			console.log('Push notification received: ', notification);
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

<Header>{m.VERIFICATION_QR()}</Header>
<ion-content fullscreen class="ion-padding">
	<div class="flex flex-col">
		{#if incomingNotification}
			<ion-icon
				icon={incomingNotification.data.message === 'ok' ? thumbsUpOutline : thumbsDownOutline}
				class="mx-auto my-6 text-9xl"
			></ion-icon>
		{:else if qr}
			<img src={qr.result.qrcode} alt="qrCode" class="w-full pt-20" />
		{/if}
	</div>
</ion-content>
