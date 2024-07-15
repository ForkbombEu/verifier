<script lang="ts">
	import { type TabProps, Tabs } from '$lib/components/tabs';
	import IonTabs from '$lib/components/tabs/IonTabs.svelte';


	const tabs: TabProps[] = [
		{ label: 'Home', tab: Tabs.home },
		{ label: 'Activity', tab: Tabs.activity },
		{ label: 'Profile', tab: Tabs.profile }
	];
</script>

<IonTabs {tabs}>
	<slot />
</IonTabs>
