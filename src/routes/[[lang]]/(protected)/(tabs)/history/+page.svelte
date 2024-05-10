<script lang="ts">
	import { TabPage } from '$lib/components/tabs';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import EmptyState from '$lib/components/molecules/EmptyState.svelte';

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
			<EmptyState
				title="No activity yet"
				subtitle="Get alerts on new activities and keep your account up-to-date."
			/>
		{/if}
	</div>
</TabPage>
