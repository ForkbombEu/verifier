<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import { PushNotifications } from '@capacitor/push-notifications';
	import { Slangroom } from '@slangroom/core';
	import { qrcode } from '@slangroom/qrcode';
	import { onMount } from 'svelte';
	import { thumbsDownOutline, thumbsUpOutline } from 'ionicons/icons';
	import Header from '$lib/components/molecules/Header.svelte';
	import { m } from '$lib/i18n';
	import dayjs from 'dayjs';
	import { Capacitor } from '@capacitor/core';

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
	onMount(() => {
		const interval = setInterval(() => registerQr, 5000);

		return () => clearInterval(interval);
	});

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
		now = dayjs().unix();
		interval = setInterval(updateTimer, 1000);
		return qr;
	};

	//
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
	//remember to uncomment before commit
	onMount(async () => {
		await registerNotifications();
		await addListeners();
	});
	registerNotifications();
	addListeners();

	let now = dayjs().unix();

	const expirationInterval = 300

	$: count = Math.round(generationDate.unix() + expirationInterval - now);
	$: h = Math.floor(count / 3600);
	$: mi = Math.floor((count - h * 3600) / 60);
	$: s = count - h * 3600 - mi * 60;

	function updateTimer() {
		console.log('ll: update', count);
		now = dayjs().unix();
	}

	let interval: NodeJS.Timeout;
	$: count <= 0 && clearInterval(interval);
</script>

<Header>{m.VERIFICATION_QR()}</Header>
<ion-content fullscreen class="ion-padding">
	<div class="flex flex-col justify-center gap-8 text-center">
		<d-text size="xl">Ask holders to scan this QR using their Wallet</d-text>
		<div class="flex w-full items-center justify-center gap-2 py-12">
			<d-avatar size="m" src={credential.issuer.logo}></d-avatar>
			<d-heading size="s">{credential.name}</d-heading>
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
		
		<div class="flex flex-col items-center justify-center gap-1">
			{#if count > 0}
				<d-text size="m">Expires in:</d-text>
				<div class="flex flex-row items-center justify-center gap-1">
					<d-text size="m">{mi}m</d-text>
					<d-text size="m">{s}s</d-text>
				</div>
			{:else}
				<d-text size="m">Expired</d-text>
			{/if}
		</div>
	</div>
</ion-content>
