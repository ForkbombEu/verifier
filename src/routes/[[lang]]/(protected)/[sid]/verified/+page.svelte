<script lang="ts">
	import { back } from '$lib/utils/index.js';
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

<d-header back-button on:backButtonClick={back}>Verification</d-header>
<ion-content class="ion-padding">
	<d-feedback {...feedback} />
	<div class="flex w-full flex-row items-start justify-around">
		<d-session-card {sid} date={dayjs.unix(at).toString()} {success} />
	</div>
</ion-content>
