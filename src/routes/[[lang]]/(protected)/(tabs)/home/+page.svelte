<script lang="ts">
	import { getVerificationFlows } from '$lib/slangroom/verificationFlows';
	import { m, r } from '$lib/i18n';
	import { TabPage } from '$lib/components/tabs';
	import { filesUri } from '$lib/backendUri';
</script>

<TabPage tab="home" title="HOME">
	{#await getVerificationFlows()}
		<ion-spinner />
	{:then verificationFlows}
		<d-heading size="s">
			{m.Verify_credential()}
		</d-heading>
		<div class="flex flex-col gap-2">
			{#each verificationFlows as vf}
				<d-credential-service
					href={r(`/${vf.id}/verify/`)}
					name={vf.name}
					logoSrc={filesUri(
						vf.expand.organization.avatar,
						vf.expand.organization.collectionName,
						vf.expand.organization.id
					)}
					issuer={vf.expand.relying_party.name}
				/>
			{/each}
		</div>
	{/await}
	<br />
</TabPage>
