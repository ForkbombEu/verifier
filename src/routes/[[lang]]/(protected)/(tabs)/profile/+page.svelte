<script lang="ts">
	import { authFilesUri, filesUri } from '$lib/backendUri.js';
	import Settings from '$lib/components/molecules/Settings.svelte';
	import { m } from '$lib/i18n';

	export let data;

	const { orgs, user } = data;
</script>

<d-tab-page tab="profile" title="Profile" settings>
	<div class="flex h-full flex-col justify-between gap-24">
		<div class="flex flex-col items-center gap-2 pt-8 text-center">
			<d-avatar src={authFilesUri(user?.avatar, user?.id)} size="xl"></d-avatar>
			<d-heading size="xs" class="w-full">{user?.name || user?.email}</d-heading>
		</div>
		<d-organizations heading={m.Badges()} empty={orgs.length == 0}>
			{#each orgs as org}
				<d-avatar src={filesUri(org.avatar, org.collectionId, org.id)} alt={org.name} size="xl" />
			{/each}
		</d-organizations>
	</div>
	<div slot="settings">
		<Settings />
	</div>
</d-tab-page>
