<script lang="ts">
	import { type IonTabProps, Tabs, IonTabs } from '$lib/components/tabs';

	const tabs: IonTabProps[] = [
		{ label: 'Home', tab: Tabs.home },
		{ label: 'Activity', tab: Tabs.activity },
		{ label: 'Profile', tab: Tabs.profile }
	];
</script>

<IonTabs {tabs}>
	<slot />
</IonTabs>
