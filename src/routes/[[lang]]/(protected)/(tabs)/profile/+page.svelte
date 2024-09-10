<script lang="ts">
	import { m, goto } from '$lib/i18n';
	import { authFilesUri, filesUri } from '$lib/backendUri.js';
	export let data;
	const { orgs, user } = data;
	import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';
	import { version } from '$app/environment';

	const logoutCB = async () => {
		await goto('/logout');
	};

	const openAppSettings = async () => {
		await NativeSettings.open({
			optionAndroid: AndroidSettings.ApplicationDetails,
			optionIOS: IOSSettings.App
		});
	};

	const gotoLanguageSettings = () => goto('/languages');
	const gotoAccountSettings = () => goto('/user-settings');

</script>

<d-tab-page tab="profile" title={m.Profile()} settings>
	<div class="flex h-full flex-col justify-between gap-24">
		<div class="flex flex-col items-center gap-2 pt-8 text-center">
			<d-avatar src={authFilesUri(user?.avatar, user?.id)} size="2xl"></d-avatar>
			<d-heading size="xs" class="w-full">{user?.name || user?.email}</d-heading>
		</div>
		<d-organizations heading={m.Badges()} empty={orgs.length == 0}>
			{#each orgs as org}
				<d-avatar
					src={filesUri(org.avatar, org.collectionId, org.id)}
					alt={org.name}
					size="xl"
					shape="square"
				/>
			{/each}
		</d-organizations>
	</div>
	<div slot="settings">
		<d-settings-menu
			account-settings={m.Account_Settings()}
			security-and-authentication={m.Security_and_Authentication()}
			notifications-settings={m.Notifications_Settings()}
			languages={m.Languages()}
			support={m.Support()}
			privacy-policy={m.Privacy_Policy()}
			log-out={m.Log_Out()}
			{version}
			developed-by={m.Developed_by_Forkbomb()}
			on:accountSettingsClick={() => goto('/user-settings')}
			on:languageSettingsClick={() => {
				console.log("pppp")
				goto('/languages')
				}}
			on:appSettingsClick={() => openAppSettings()}
			on:logoutClick={() => goto('/logout')}
		/>
	</div>
	<div class="pb-24" />
</d-tab-page>
