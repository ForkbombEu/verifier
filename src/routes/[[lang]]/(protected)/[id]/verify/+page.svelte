<script lang="ts">
	import { PushNotifications } from '@capacitor/push-notifications';
	import { Slangroom } from '@slangroom/core';
	import { qrcode } from '@slangroom/qrcode';
	import { onMount } from 'svelte';
	import { thumbsDownOutline, thumbsUpOutline } from 'ionicons/icons';
	import Header from '$lib/components/molecules/Header.svelte';
	import { m } from '$lib/i18n';
	import dayjs from 'dayjs';
	import { Capacitor } from '@capacitor/core';
	import Countdown from '$lib/components/organism/Countdown.svelte';

	export let data: any;

	const { credential } = data;

	let qr: any;
	let id: string;
	let generationDate = dayjs();
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
			await registerQr();
		});

		await PushNotifications.addListener('registrationError', (err) => {
			error = err.error;
		});

		await PushNotifications.addListener('pushNotificationReceived', (notification) => {
			incomingNotification = notification;
			console.log('Push notification received: ', notification);
		});
	};
	function makeid(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	const registerQr = async () => {
		id = makeid(5);
		generationDate = dayjs();

		const text = JSON.stringify({
			id,
			tok,
			url: 'http://oracle1.zenswarm.forkbomb.eu:3366/verify-credential',
			name: data.credential.name,
			issuedBy: data.credential.issuer
		});

		const res = await slangroom.execute(scriptCreate, {
			data: {
				text
			}
		});
		qr = res.result.qrcode;
		return qr;
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
	<div class="flex flex-col justify-center gap-8 text-center">
		<d-text size="xl">Ask holders to scan this QR using their Wallet</d-text>
		<div class="flex w-full items-center justify-center gap-2 py-12">
			<!-- <d-avatar size="m" src={credential.credential_issuer.logo}></d-avatar> -->
			<d-heading size="s">{credential.display_name}</d-heading>
		</div>
		{#if incomingNotification}
			<ion-icon
				icon={incomingNotification.data.message === 'ok' ? thumbsUpOutline : thumbsDownOutline}
				class="mx-auto my-6 text-9xl"
			></ion-icon>
		{:else if qr}
			<div
				class="flex flex-row items-center justify-center gap-1 rounded-[0px_8px_8px_0px] bg-primary px-2 py-4"
			>
				<img src={qr} alt="qrCode" class="w-full" />
				<div class="flex flex-col items-center justify-center gap-1 px-2 py-4 text-center">
					<d-text size="l" class="w-max">Session ID:</d-text>
					<d-heading size="s">{id}</d-heading>
					<d-text size="m"
						>{generationDate.day()}/{generationDate.month()}/{generationDate.year()}</d-text
					>
					<d-text size="m"
						>{generationDate.hour()}:{generationDate.minute()}:{generationDate.second()}</d-text
					>
				</div>
			</div>
			<d-button color="accent" expand on:click={registerQr}>RE-GENERATE</d-button>
		{/if}

		<!-- for web test no tok provided-->
		{#if Capacitor.getPlatform() == 'web'}
			{#await registerQr()}
				<div
					class="flex flex-row items-center justify-center gap-1 rounded-[0px_8px_8px_0px] bg-primary px-2 py-4"
				>
					<img src={qr} alt="qrCode" class="w-full" />
					<div class="flex flex-col items-center justify-center gap-1 px-2 py-4 text-center">
						<d-text size="l" class="w-max">Session ID:</d-text>
						<d-heading size="s">{id}</d-heading>
						<d-text size="m"
							>{generationDate.day()}/{generationDate.month()}/{generationDate.year()}</d-text
						>
						<d-text size="m"
							>{generationDate.hour()}:{generationDate.minute()}:{generationDate.second()}</d-text
						>
					</div>
				</div>
				<d-button color="accent" expand on:click={registerQr}>RE-GENERATE</d-button>
			{/await}
		{/if}
		<!-- end for web -->

		<Countdown initial={generationDate.unix()} />
	</div>
</ion-content>