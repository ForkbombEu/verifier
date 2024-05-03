<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import type { Feedback } from '$lib/utils/types.js';
	import dayjs from 'dayjs';

	export let data;

	const { verifiedSid } = data;
	const { sid, at, success, message } = verifiedSid;
	let feedback: Feedback;
	$: if (!success) {
		feedback = {
			type: 'error',
			feedback: 'Verification failed',
			message
		};
	}
</script>

<Header>Verification</Header>
<ion-content class="ion-padding">
	<d-feedback {...feedback} />
	<div class="flex w-full flex-row items-start justify-around">
		<d-session-card {sid} date={dayjs.unix(at).toString()} {success} />
	</div>
</ion-content>
