<script lang="ts">
	// import { m } from '$lib/i18n';
	import { authFilesUri, filesUri } from '$lib/backendUri.js';
	import AppDetails from '$lib/components/AppDetails.svelte';
	import { TabPage } from '$lib/components/tabs/index.js';

	export let data;

	const { orgs, user } = data;
</script>

<TabPage tab="profile" title="Profile">
	<div class="flex flex-col items-center gap-2 pt-8 text-center">
		<d-avatar src={authFilesUri(user?.avatar, user?.id)} size="xl"></d-avatar>
		<d-heading size="s" class="w-full">{user?.name || user?.email}</d-heading>
		{#if orgs.length > 0}
			<d-heading size="xs" class="mt-16 w-full text-center">{'Badges'}</d-heading>
			<div class="mx-auto mt-8 flex w-11/12 flex-wrap items-center justify-between gap-2">
				{#each orgs as org}
					<d-avatar src={filesUri(org.avatar, org.collectionId, org.id)} alt={org.name} size="xl" />
				{/each}
			</div>
		{/if}
		<d-button href="/logout" class="mt-20 w-full" color="outline" expand>Logout</d-button>
		<AppDetails />
	</div>
</TabPage>
