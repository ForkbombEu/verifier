<script>
	import { chevronBackOutline } from 'ionicons/icons';
	export let backButton = true;
	//TODO: fix background color with actual token
</script>

<ion-header class="bg-[#243151]">
	<ion-toolbar>
		{#if backButton}
			<ion-buttons slot="start">
				<ion-button on:click={() => window.history.back()} on:keydown={() => window.history.back()} aria-hidden>
					<ion-icon icon={chevronBackOutline}></ion-icon>
				</ion-button>
			</ion-buttons>
		{/if}
		<ion-title class="text-center">
			<slot />
		</ion-title>
		{#if backButton}
			<ion-buttons slot="end" class="invisible">
				<div class="px-5" />
			</ion-buttons>
		{/if}
	</ion-toolbar>
</ion-header>
