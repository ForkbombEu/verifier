<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	//@ts-ignore
	import { Slangroom } from '@slangroom/core';
	//@ts-ignore
	import { qrcode } from '@slangroom/qrcode';
	const scriptCreate = `
Rule unknown ignore

Given I send text 'text' and create qr code and output into 'qrcode'
Given I have a 'string' named 'qrcode'
Then print data
`;
	const slangroom = new Slangroom(qrcode);
	const promise = slangroom.execute(scriptCreate, {
		data: {
			text: 'i am a pony!'
		}
	});
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

	{#await promise}
		waiting
	{:then res}
		<img src={res.result.qrcode} class="w-full pt-20" />
	{:catch error}
		Something bad happened.
	{/await}
</ion-content>
