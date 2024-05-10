<script lang="ts">
	import Bell from '$lib/assets/bell.svelte';
	import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
	import { arrowForwardOutline } from 'ionicons/icons';

	export let title: string;
	export let subtitle: string;

	const openSettings = async () => {
		await NativeSettings.open({
			optionAndroid: AndroidSettings.AppNotification,
			optionIOS: IOSSettings.App
		});
	};
</script>

<div class="flex h-3/5 flex-col items-center justify-center gap-1">
	<div>
		<Bell />
	</div>
	<d-heading size="s">{title}</d-heading>
	<d-text size="l" class="pb-4 text-center">{subtitle}</d-text>
	<d-button expand color="outline" on:click={openSettings} on:keydown={openSettings} aria-hidden>
		NOTIFICATIONS SETTINGS <ion-icon slot="end" icon={arrowForwardOutline} />
	</d-button>
</div>
