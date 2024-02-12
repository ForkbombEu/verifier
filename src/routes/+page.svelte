<script lang="ts">
	import Header from '$lib/components/atoms/Header.svelte';
	import { getServices } from '$lib/slangroom/services';


</script>
<Header backButton={false}>VERIFIER</Header>
<ion-content fullscreen class="ion-padding space-y-10">
	{#await getServices()}
		<ion-spinner />
	{:then res}
		{@const services = res.result.items}
		<d-heading size="s">
			Verify credential
		</d-heading>
		<div class="flex flex-col gap-2">
			{#each services as service}
				<d-credential-service name={service.name} issuer={service.issuer} href={`${service.id}/credential-detail`} />
			{/each}
		</div>
	{/await}
	<br />
	
</ion-content>


