export const Tabs = {
	home: 'home',
	activity: 'activity',
	profile: 'profile'
} as const;

export type Tab = (typeof Tabs)[keyof typeof Tabs];

//

export type IonTabProps = {
	label: string;
	tab: Tab;
};

//

import TabPage from './TabPage.svelte';
import IonTabs from './IonTabs.svelte';
export { TabPage, IonTabs };
