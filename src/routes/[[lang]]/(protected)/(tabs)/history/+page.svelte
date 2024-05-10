<script lang="ts">
	import Bell from '$lib/assets/bell.svelte';
	import { TabPage } from '$lib/components/tabs';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';
	import { arrowForwardOutline } from 'ionicons/icons';

	const openSettings = async () => {
		await NativeSettings.open({
			optionAndroid: AndroidSettings.AppNotification,
			optionIOS: IOSSettings.App
		});
	};

	dayjs.extend(relativeTime);
	export let data;
	const { verifiedSids } = data;
</script>

<TabPage tab="history" title="History">
	<div class="flex flex-col items-center justify-center gap-2">
		{#if verifiedSids && verifiedSids.length > 0}
			{#each verifiedSids.reverse() as verifiedSid}
				<div class="flex w-full flex-col rounded-md border-on bg-primary p-4">
					<div class="flex flex-col items-start justify-center gap-1">
						<d-heading size="s">{verifiedSid.sid}</d-heading>
						<d-text size="m">{verifiedSid.success ? 'verified' : 'failure'}</d-text>
						<div class="flex items-center gap-2.5">
							<div
								class="h-[5px] w-[5px] shrink-0 rounded-full border border-solid border-warning bg-warning"
							/>
							<d-text size="s">{dayjs().to(dayjs.unix(verifiedSid.at))}</d-text>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<div class="flex h-3/5 flex-col items-center justify-center gap-1">
				<div>
					<Bell />
				</div>
				<d-heading size="s">No activity yet</d-heading>
				<d-text size="l" class="pb-4 text-center"
					>Get alerts on new activities and keep your account up-to-date.</d-text
				>
				<d-button expand color="outline" on:click={openSettings}>
					NOTIFICATIONS SETTINGS <ion-icon slot="end" icon={arrowForwardOutline} />
				</d-button>
			</div>
		{/if}
	</div>
</TabPage>
