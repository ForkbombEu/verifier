<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import { getServices } from '$lib/slangroom/services';


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
	{#await getServices()}
		<ion-spinner />
	{:then res}
		{@const services = res.result.items}
		<div class="flex flex-col gap-2">
			{#each services as service}
				<d-credential-service name={service.name} issuer={service.issuer} href={`${service.id}/credential-detail`} />
			{/each}
		</div>
	{/await}
	<br />
	
</ion-content>


