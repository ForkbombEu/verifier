<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import Bell from '$lib/assets/bell.svelte';
	import { m } from '$lib/i18n';
	import { arrowForwardOutline } from 'ionicons/icons';
	import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';

	dayjs.extend(relativeTime);
	export let data;
	const { verifiedSids } = data;
	const openSettings = async () => {
		await NativeSettings.open({
			optionAndroid: AndroidSettings.AppNotification,
			optionIOS: IOSSettings.App
		});
	};
</script>

<d-tab-page tab="activity" title="Activity">
	<d-vertical-stack class="items-center justify-center">
		{#if verifiedSids && verifiedSids.length > 0}
			{#each verifiedSids.reverse() as verifiedSid}
				<d-activity-card
					message={`${verifiedSid.sid} ${verifiedSid.success ? 'verified' : 'failure'}`}
					date={dayjs().to(dayjs.unix(verifiedSid.at))}
				/>
			{/each}
		{:else}
			<d-empty-state
				heading={m.No_activity_yet()}
				text={m.Get_alerts_on_new_activities_and_keep_your_account_uptodate_()}
			>
				<Bell />
				<d-button
					expand
					color="outline"
					on:click={openSettings}
					on:keydown={openSettings}
					aria-hidden
				>
					{m.NOTIFICATIONS_SETTINGS()} <ion-icon slot="end" icon={arrowForwardOutline} />
				</d-button>
			</d-empty-state>
		{/if}
	</d-vertical-stack>
</d-tab-page>
