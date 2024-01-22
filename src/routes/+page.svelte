<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Card from '$lib/components/molecules/Card.svelte';
	import fakeCredentials from '$lib/fakeCredentials';
	//
	// import {
	// 	PushNotifications,
	// 	type DeliveredNotifications,
	// 	type PushNotificationSchema
	// } from '@capacitor/push-notifications';

	// let incomingNotification: PushNotificationSchema;
	// let registrationToken: string;
	// let notificationsList: DeliveredNotifications;

	// const addListeners = async () => {
	// 	await PushNotifications.addListener('registration', (token) => {
	// 		registrationToken = token.value;
	// 		console.info('Registration token: ', token.value);
	// 	});

	// 	await PushNotifications.addListener('registrationError', (err) => {
	// 		registrationToken = err.error;
	// 		console.error('Registration error: ', err.error);
	// 	});

	// 	await PushNotifications.addListener('pushNotificationReceived', (notification) => {
	// 		incomingNotification = notification;
	// 		console.log('Push notification received: ', notification);
	// 	});

	// 	await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
	// 		console.log('Push notification action performed', notification.actionId, notification.inputValue);
	// 	});
	// };

	// const registerNotifications = async () => {
	// 	let permStatus = await PushNotifications.checkPermissions();

	// 	if (permStatus.receive === 'prompt') {
	// 		permStatus = await PushNotifications.requestPermissions();
	// 	}

	// 	if (permStatus.receive !== 'granted') {
	// 		throw new Error('User denied permissions!');
	// 	}

	// 	await PushNotifications.register();
	// };

	// const getDeliveredNotifications = async () => {
	// 	const notificationList = await PushNotifications.getDeliveredNotifications();
	// 	console.log('delivered notifications', notificationList);
	// };

	// registerNotifications();
	// addListeners();
	// $: getDeliveredNotifications();
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

<ion-content fullscreen class="ion-padding space-y-10">
	<h1 class="text-[32px] font-medium leading-[20.5px] tracking-[-0.5px] text-[#E8D2FF]">Home</h1>
	{#each fakeCredentials as credential}
		<Card title={credential.title} content={credential.issuedBy}>
			<ion-button href={`/verify/`}>Verify</ion-button>
		</Card>
	{/each}
	<br />
	<!-- {#if registrationToken}
		<ion-Input value={registrationToken} label="registration token" />
	{/if}
	{#if incomingNotification}
		<pre>
				{JSON.stringify(incomingNotification, null, 2)}
			</pre>
	{/if}
	{#if notificationsList}
		<pre>
				{JSON.stringify(notificationsList, null, 2)}
			</pre>
	{/if} -->
</ion-content>
