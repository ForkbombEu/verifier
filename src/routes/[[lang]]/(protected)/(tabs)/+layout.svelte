<script lang="ts">
	import { home, personOutline, notificationsOutline } from 'ionicons/icons';

	// Note – IonTabs must be imported this way, otherwise the app breaks
	//@ts-ignore
	import IonTabs from 'ionic-svelte/components/IonTabs.svelte';
	import { type IonTabProps, Tabs } from '$lib/components/tabs';
	// import { m } from '$lib/i18n';

	//

	const tabs: IonTabProps[] = [
		{ label: 'Home', icon: home, tab: Tabs.home },
		{ label: 'History', icon: notificationsOutline, tab: Tabs.history },
		{ label: 'Profile', icon: personOutline, tab: Tabs.profile }
	];
</script>

<IonTabs slot="bottom" {tabs}>
	<slot />
</IonTabs>
