<script lang="ts">
	import { PushNotifications } from '@capacitor/push-notifications';
	import { Slangroom } from '@slangroom/core';
	import { qrcode } from '@slangroom/qrcode';
	import { helpers } from '@slangroom/helpers';
	import { goto, m } from '$lib/i18n';
	import dayjs from 'dayjs';
	import { Capacitor } from '@capacitor/core';
	import Countdown from '$lib/components/organism/Countdown.svelte';

	import cardToQr from '$lib/mobile_zencode/verifier/card_to_qr.zen?raw';
	import cardToQrKeys from '$lib/mobile_zencode/verifier/card_to_qr.keys.json?raw';
	import { backendUri } from '$lib/backendUri';
	import { saveRuAndSid } from '$lib/preferences/sidRu';
	import { log } from '$lib/log';
	import { onIncomingNotification } from './_lib/tools';

	export let data: any;

	const { verificationFlow, user } = data;

	let qr: any;
	let id: string;
	let generationDate = dayjs();
	let expirationInterval = 300;
	let error: string;
	let tok: string;
	let permissionDenied: boolean;

	const slangroom = new Slangroom(qrcode, helpers);
	let incomingNotification: any;

	const addListeners = async () => {
		await PushNotifications.addListener('registration', async (token) => {
			tok = token.value;
			await registerQr(tok);
		});

		await PushNotifications.addListener('registrationError', (err) => {
			error = err.error;
		});

		await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
			incomingNotification = notification;
			log(`Push notification received: /n ${JSON.stringify(notification)}`);
			await onIncomingNotification(notification);
		});
	};

	const registerQr = async (t: string) => {
		const data = {
			id: user.id,
			template: verificationFlow.template,
			relying_party: verificationFlow.expand.relying_party.endpoint,
			pb_url: backendUri,
			pb_api: '/api/collections/templates_public_data/records',
			expires_in: expirationInterval,
			registrationToken: t,
			m: 'f'
		};
		const res = await slangroom.execute(cardToQr, { data, keys: JSON.parse(cardToQrKeys) });
		const result = res.result;
		qr = result.qrcode;
		id = result.sid as string;
		await saveRuAndSid(
			result.sid as string,
			result.ru as string,
			verificationFlow.expand.template.zencode_script,
			verificationFlow.expand.template.zencode_data
		);
		generationDate = dayjs();
		return qr;
	};

	const registerNotifications = async () => {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive === 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			permissionDenied = true;
			// throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
	};

	$: if (!tok) {
		registerNotifications();
		addListeners();
	}
</script>

<d-header back-button backFunction={() => goto('/home')}>{m.VERIFICATION_QR()}</d-header>
<ion-content fullscreen class="ion-padding">
	<div class="flex flex-col justify-center gap-8 text-center">
		<d-text size="xl">Ask holders to scan this QR using their Wallet</d-text>
		<div class="flex w-full items-center justify-center gap-2 py-12">
			<d-heading size="s">{verificationFlow.name}</d-heading>
		</div>
		<!-- for web test no tok provided-->
		{#if Capacitor.getPlatform() == 'web'}
			{#await registerQr('fcm registration token is not available in web') then qr}
				<div
					class="flex flex-row items-center justify-center gap-1 rounded-lg bg-primary px-2 py-4"
				>
					<div class="flex-grow">
						<img src={qr} alt="qrCode" class="w-full" />
					</div>
					<div
						class="flex flex-shrink flex-col items-center justify-center gap-1 px-2 py-4 text-center"
					>
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
				<d-button
					color="accent"
					expand
					on:click={() => registerQr('fcm registration token is not available in web')}
					on:keydown={() => registerQr('fcm registration token is not available in web')}
					aria-hidden>RE-GENERATE</d-button
				>
			{/await}
			<!-- end for web -->
		{:else if permissionDenied}
			<d-empty-state
				heading={'Permission Denied'}
				text={'Please allow the app to receive push notifications in order to proceed.'}
			/>
		{:else if qr}
			<div
				class="flex flex-row items-center justify-center gap-1 rounded-[0px_8px_8px_0px] bg-primary px-2 py-4"
			>
				<div class="flex-grow">
					<img src={qr} alt="qrCode" class="w-full" />
				</div>
				<div
					class="flex flex-shrink flex-col items-center justify-center gap-1 px-2 py-4 text-center"
				>
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
			<d-button
				color="accent"
				expand
				on:click={() => registerQr(tok)}
				on:keydown={() => registerQr(tok)}
				aria-hidden>RE-GENERATE</d-button
			>
			<Countdown initial={generationDate.unix()} {expirationInterval} />
		{/if}
	</div>
</ion-content>
