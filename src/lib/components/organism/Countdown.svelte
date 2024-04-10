<script lang="ts">
	import dayjs from 'dayjs';

	let now = dayjs().unix();
	let expired: boolean;

	export let initial: number;

	const expirationInterval = 300;

	let interval: NodeJS.Timeout;

	$: count = Math.round(initial + expirationInterval - now);
	$: h = Math.floor(count / 3600);
	$: mi = Math.floor((count - h * 3600) / 60);
	$: s = count - h * 3600 - mi * 60;

	function updateTimer() {
		now = dayjs().unix();
	}

	$: if (count == 0) {
		expired = true;
		clearInterval(interval);
	}
	$: {
		initial;
		expired = false;
		now = dayjs.unix();
		interval = setInterval(updateTimer, 1000);
	}
</script>

<div class="flex flex-col items-center justify-center gap-1">
	{#if !expired}
		<d-text size="l">Expires in:</d-text>
		<div class="flex flex-row items-center justify-center gap-1">
			{#if h}
				<d-heading size="s">{h}h</d-heading>
			{/if}
            {#if mi}
				<d-heading size="s">{mi}m</d-heading>
			{/if}
			{#if s}
				<d-heading size="s">{s}s</d-heading>
			{/if}
		</div>
	{:else}
		<d-heading class="text-error" size="m">Expired</d-heading>
	{/if}
</div>
