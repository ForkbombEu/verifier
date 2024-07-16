<script lang="ts">
	import type { Tab } from '.';

	export let tab: Tab;
	export let title: string;
</script>

<ion-tab {tab}>
	<d-header>{title}</d-header>

	<ion-content fullscreen class="ion-padding">
		<slot />
	</ion-content>
</ion-tab>
