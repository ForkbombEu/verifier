<script lang="ts">
	import TabPage from '$lib/tabs/TabPage.svelte';
	import { m } from '$lib/i18n';
	import chat from '$lib/assets/chat.svg';
	import { clearPreferences } from '$lib/preferences';

	export let data;

	const { orgs, keys, user, did, logged } = data;
</script>

<TabPage tab="profile" title="PROFILE">
	<div class="flex flex-col items-center gap-2 pt-16 text-center">
		{#if logged}
			<d-heading size="s" class="w-full text-center">Alessandro CognomeLunghissimo</d-heading>
			<div class="flex w-full items-center justify-center gap-2">
				<!-- <IconKey /> -->
				<d-text>{' '}: {did.result.didDocument.id.substring(0, 25)}</d-text>
			</div>

			<d-heading size="xs" class="mt-16 w-full text-center">{'m.Badges()'}</d-heading>
			<div class="mx-auto mt-8 flex w-3/5 flex-wrap items-center justify-between gap-8">
				{#if orgs}
					{#each orgs as org}
						<d-avatar
							src={`https://admin.signroom.io/api/files/${org.collectionId}/${org.id}/${org.avatar}`}
							alt={org.name}
							size="xl"
						/>
					{/each}
				{/if}
				<d-button
					href="/logout"
					class="mt-20"
					on:click={clearPreferences}
					on:keydown={clearPreferences}
					aria-hidden>Logout</d-button
				>
			</div>
		{:else}
			<img src={chat} alt="chat" class="w-1/2" />
			<d-heading size="s" class="w-full text-center">Login as Verifier</d-heading>
			<d-text class="w-full text-center"
				>Get alerts on new activities and keep your account up-to-date.</d-text
			>
			<d-button href="/register-login" class="mt-8" color="outline" expand
				>Login to get started -></d-button
			>
		{/if}
	</div>
</TabPage>
