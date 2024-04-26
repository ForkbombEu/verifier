<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import { getServices } from '$lib/slangroom/services';
	import { m, r } from '$lib/i18n';
	import { TabPage } from '$lib/tabs';
</script>

<Header backButton={false}>{m.VERIFIER()}</Header>
<TabPage tab="home" title="HOME">
	{#await getServices()}
		<ion-spinner />
	{:then res}
		{@const services = res.result.items}
		<d-heading size="s">
			{m.Verify_credential()}
		</d-heading>
		<div class="flex flex-col gap-2">
			{#each services as service}
				<d-credential-service
					href={r(`/${service.id}/verify/`)}
					name={service.display_name}
					issuer={service.credential_issuer}
				/>
			{/each}
		</div>
	{/await}
	<br />
</TabPage>
