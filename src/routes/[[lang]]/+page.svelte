<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import { getServices } from '$lib/slangroom/services';
	import { m, r} from '$lib/i18n';


</script>
<Header backButton={false}>VERIFIER</Header>
<ion-content fullscreen class="ion-padding space-y-10">
	{#await getServices()}
		<ion-spinner />
	{:then res}
		{@const services = res.result.items}
		<d-heading size="s">
			{m.Verify_credential()}
		</d-heading>
		<div class="flex flex-col gap-2">
			{#each services as service}
				<d-credential-service name={service.name} issuer={service.issuer} href={r(`${service.id}/credential-detail`)} />
			{/each}
		</div>
	{/await}
	<br />
	
</ion-content>


