<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import Card from '$lib/components/molecules/Card.svelte';
	import fakeCredentials from '$lib/fakeCredentials';
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
</ion-content>
