<script lang="ts">
	import { m, r } from '$lib/i18n';
	import { filesUri } from '$lib/backendUri';

	export let data;
	const { verificationFlows } = data
</script>

<d-tab-page tab="home" title="HOME">
	<d-heading size="s">
		{m.Verify_credential()}
	</d-heading>
	<d-vertical-stack>
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
	</d-vertical-stack>
	<br />
</d-tab-page>
