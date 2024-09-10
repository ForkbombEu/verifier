<script lang="ts">
	import { page } from '$app/stores';
	import { goto, i18n, m } from '$lib/i18n';
	import { setLanguagePreference } from '$lib/preferences/lang';
	import { availableLanguageTags } from '$paraglide/runtime';

	const back = () => goto('/profile');
	const recordLanguages = {
		en: 'English',
		es: 'Español',
		fr: 'Français',
		de: 'Deutsch',
		it: 'Italiano'
	};
	$: activeLanguage = i18n.getLanguageFromUrl($page.url);
	function handleLanguageChange(language: 'en' | 'it') {
		setLanguagePreference(language).then(() => {
			activeLanguage = language;
			window.location.replace(`/${language}/languages`);
		});
	}
</script>

<d-header back-button on:backButtonClick={back}>
	{m.Languages()}
</d-header>

<ion-content fullscreen class="ion-padding">
	{#each availableLanguageTags as language}
		{#if activeLanguage === language}
			<button
				class="border-b-stroke flex h-16 w-full items-center justify-between gap-2.5 rounded-lg border-b border-solid bg-primary px-5 py-8"
			>
				<span class="flex items-center self-stretch">
					{recordLanguages[language]}
				</span>
				<span><d-icon icon="check" outline></d-icon></span>
			</button>
		{:else}
			<button
				class="border-b-stroke flex h-16 w-full items-center justify-between gap-2.5 rounded-lg border-b border-solid px-5 py-8"
				on:click={() => handleLanguageChange(language)}
			>
				<span class="flex items-center self-stretch">
					{recordLanguages[language]}
				</span>
			</button>
		{/if}
	{/each}
</ion-content>
